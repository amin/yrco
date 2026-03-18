import axios from "axios";
import admin from "firebase-admin";

const LINKEDIN_AUTH_URL = "https://www.linkedin.com/oauth/v2/authorization";
const LINKEDIN_TOKEN_URL = "https://www.linkedin.com/oauth/v2/accessToken";
const LINKEDIN_PROFILE_URL = "https://api.linkedin.com/v2/userinfo";

export function linkedinRedirect(req, res) {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.LINKEDIN_CLIENT_ID,
    redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
    scope: "openid profile email",
  });

  res.redirect(`${LINKEDIN_AUTH_URL}?${params}`);
}

async function uploadProfilePicture(uid, pictureUrl) {
  const { data } = await axios.get(pictureUrl, {
    responseType: "arraybuffer",
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  const { bucket } = await import("../lib/firebase.js");
  const file = bucket.file(`profile-pictures/${uid}`);

  await file.save(Buffer.from(data), { contentType: "image/jpeg", public: true });

  return file.publicUrl();
}

export async function linkedinCallback(req, res) {
  const { code } = req.query;

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
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  // Fetch LinkedIn profile
  const { data: profile } = await axios.get(LINKEDIN_PROFILE_URL, {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });

  // Upload profile picture to Firebase Storage
  const pictureUrl = await uploadProfilePicture(profile.sub, profile.picture);

  // Upsert user in Firestore
  const { db } = await import("../lib/firebase.js");
  await db.collection("users").doc(profile.sub).set(
    {
      name: profile.name,
      email: profile.email,
      picture: pictureUrl,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  // Create Firebase custom token
  const firebaseToken = await admin.auth().createCustomToken(profile.sub);

  res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${firebaseToken}`);
}
