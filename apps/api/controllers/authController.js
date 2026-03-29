import crypto from "crypto";
import { authenticateWithLinkedIn, logout } from "../usecases/authUseCases.js";
import { buildLinkedInAuthUrl } from "../helpers/buildLinkedInAuthUrl.js";

export function handleLinkedInRedirect(req, res) {
  const csrf = crypto.randomUUID();
  res.cookie("oauth_state", csrf, { httpOnly: true, signed: true, sameSite: "lax", maxAge: 10 * 60 * 1000 });

  const redirect = req.query.redirect;
  const validRedirect = redirect && redirect.startsWith("/") && !redirect.startsWith("//") && redirect.length <= 200
    ? redirect
    : null;

  const state = `${csrf}:${validRedirect ?? ""}`;

  res.redirect(buildLinkedInAuthUrl(state, {
    clientId: process.env.LINKEDIN_CLIENT_ID,
    redirectUri: process.env.LINKEDIN_REDIRECT_URI,
  }));
}

export async function handleLinkedInCallback(req, res) {
  try {
    const { code, state: rawState } = req.query;

    const [csrf, redirect] = (rawState ?? "").split(/:(.*)/);
    if (!csrf || csrf !== req.signedCookies.oauth_state)
      throw { status: 400, message: "Invalid OAuth state" };

    const { sessionToken, maxAge } = await authenticateWithLinkedIn(code);

    res.clearCookie("oauth_state", { signed: true });
    res.cookie("session", sessionToken, {
      httpOnly: true,
      signed: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge,
    });

    const loginUrl = redirect
      ? `${process.env.CLIENT_URL}/auth/callback?redirect=${encodeURIComponent(redirect)}`
      : `${process.env.CLIENT_URL}/auth/callback`;
    res.redirect(loginUrl);
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
