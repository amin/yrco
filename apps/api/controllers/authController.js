import crypto from "crypto";
import { authenticateWithLinkedIn, logout } from "../usecases/authUseCases.js";
import { buildLinkedInAuthUrl } from "../helpers/buildLinkedInAuthUrl.js";
import { buildPostAuthRedirect } from "../helpers/buildPostAuthRedirect.js";

export function handleLinkedInRedirect(req, res) {
  const state = crypto.randomUUID();
  res.cookie("oauth_state", state, { httpOnly: true, signed: true, sameSite: "lax", maxAge: 10 * 60 * 1000 });

  const redirect = req.query.redirect;
  if (redirect && redirect.startsWith("/") && !redirect.startsWith("//") && redirect.length <= 200) {
    res.cookie("post_auth_redirect", redirect, { httpOnly: true, signed: true, sameSite: "lax", maxAge: 10 * 60 * 1000 });
  }

  res.redirect(buildLinkedInAuthUrl(state, {
    clientId: process.env.LINKEDIN_CLIENT_ID,
    redirectUri: process.env.LINKEDIN_REDIRECT_URI,
  }));
}

export async function handleLinkedInCallback(req, res) {
  try {
    const { code, state } = req.query;
    if (!state || state !== req.signedCookies.oauth_state)
      throw { status: 400, message: "Invalid OAuth state" };

    const { sessionToken, maxAge, setupComplete, username } = await authenticateWithLinkedIn(code);

    res.clearCookie("oauth_state", { signed: true });
    res.cookie("session", sessionToken, {
      httpOnly: true,
      signed: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge,
    });

    const postAuthRedirect = req.signedCookies.post_auth_redirect;
    res.clearCookie("post_auth_redirect", { signed: true });

    const redirectTo = buildPostAuthRedirect(setupComplete, username, postAuthRedirect);
    res.redirect(`${process.env.CLIENT_URL}${redirectTo}`);
  } catch (err) {
    console.error("LinkedIn auth error:", err);
    const message = encodeURIComponent(err.status ? err.message : "Authentication failed");
    res.redirect(`${process.env.CLIENT_URL}/error?message=${message}`);
  }
}

export async function handleLogout(req, res) {
  await logout(req.signedCookies.session);
  res.clearCookie("session", { signed: true });
  res.json({ ok: true });
}
