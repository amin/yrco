import { buildLinkedInAuthUrl, exchangeLinkedInCode, fetchLinkedInProfile, uploadProfilePicture } from "../services/authService.js";
import { upsertUser } from "../services/usersService.js";

export function linkedinRedirect(_req, res) {
  const state = crypto.randomUUID();
  res.cookie("oauth_state", state, { httpOnly: true, signed: true, sameSite: "lax" });
  res.redirect(buildLinkedInAuthUrl(state));
}

export async function linkedinCallback(req, res) {
  const { code, state } = req.query;

  try {
    if (!state || state !== req.signedCookies.oauth_state) {
      return res.redirect(`${process.env.CLIENT_URL}/error?message=auth_failed`);
    }

    res.clearCookie("oauth_state", { signed: true });

    const accessToken = await exchangeLinkedInCode(code);
    const profile = await fetchLinkedInProfile(accessToken);
    const pictureUrl = await uploadProfilePicture(profile.sub, profile.picture);

    const { setupComplete } = await upsertUser(profile.sub, {
      name: profile.name,
      firstName: profile.given_name,
      lastName: profile.family_name,
      email: profile.email,
      picture: pictureUrl,
    });

    res.cookie("session", profile.sub, {
      httpOnly: true,
      signed: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect(`${process.env.CLIENT_URL}${setupComplete === false ? "/setup" : "/me"}`);
  } catch (err) {
    console.error("LinkedIn auth error:", err);
    res.redirect(`${process.env.CLIENT_URL}/error?message=auth_failed`);
  }
}

export function logout(_req, res) {
  res.clearCookie("session", { signed: true });
  res.json({ ok: true });
}
