import axios from "axios";
import { db, bucket, FieldValue } from "../lib/firebase.js";

const LINKEDIN_AUTH_URL = "https://www.linkedin.com/oauth/v2/authorization";
const LINKEDIN_TOKEN_URL = "https://www.linkedin.com/oauth/v2/accessToken";
const LINKEDIN_PROFILE_URL = "https://api.linkedin.com/v2/userinfo";

export function linkedinRedirect(_, res) {
  const state = crypto.randomUUID();

  res.cookie("oauth_state", state, { httpOnly: true, signed: true, sameSite: "lax" });

  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.LINKEDIN_CLIENT_ID,
    redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
    scope: "openid profile email",
    state,
  });

  res.redirect(`${LINKEDIN_AUTH_URL}?${params}`);
}

async function uploadProfilePicture(uid, pictureUrl) {
  const { data } = await axios.get(pictureUrl, {
    responseType: "arraybuffer",
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  const file = bucket.file(`profile-pictures/${uid}`);

  await file.save(Buffer.from(data), {
    contentType: "image/jpeg",
    public: true,
  });

  return file.publicUrl();
}

export async function linkedinCallback(req, res) {
  const { code, state } = req.query;

  try {
    if (!state || state !== req.signedCookies.oauth_state) {
      return res.redirect(`${process.env.CLIENT_URL}/error?message=auth_failed`);
    }

    res.clearCookie("oauth_state", { signed: true });
    // Exchange code for access token
    const { data: tokenData } = await axios.post(
      LINKEDIN_TOKEN_URL,
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );

    // Fetch LinkedIn profile
    const { data: profile } = await axios.get(LINKEDIN_PROFILE_URL, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    // Upload profile picture to Firebase Storage
    const pictureUrl = await uploadProfilePicture(profile.sub, profile.picture);

    // Check if user exists
    const userRef = db.collection("users").doc(profile.sub);
    const existing = await userRef.get();
    const isNewUser = !existing.exists;

    // Upsert user in Firestore
    await userRef.set(
      {
        name: profile.name,
        firstName: profile.given_name,
        lastName: profile.family_name,
        email: profile.email,
        picture: pictureUrl,
        updatedAt: FieldValue.serverTimestamp(),
        ...(isNewUser && { setupComplete: false, createdAt: FieldValue.serverTimestamp() }),
      },
      { merge: true },
    );

    const snap = isNewUser ? { setupComplete: false } : (await userRef.get()).data();

    res.cookie("session", profile.sub, {
      httpOnly: true,
      signed: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const redirectTo = snap.setupComplete === false ? "/setup" : "/me";
    res.redirect(`${process.env.CLIENT_URL}${redirectTo}`);
  } catch (err) {

    console.error("LinkedIn auth error:", err);
    res.redirect(`${process.env.CLIENT_URL}/error?message=auth_failed`);
  }
}

export function logout(_, res) {
  res.clearCookie("session", { signed: true });
  res.json({ ok: true });
}
