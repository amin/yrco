import crypto from "crypto";
import { authenticateWithLinkedIn, logout } from "../usecases/authUseCases.js";
import { buildLinkedInAuthUrl } from "../helpers/buildLinkedInAuthUrl.js";
import { validateRedirect } from "../helpers/validateRedirect.js";

const allowedOrigins = (process.env.ALLOWED_CLIENT_ORIGINS ?? '').split(',').filter(Boolean);

export function handleLinkedInRedirect(req, res) {
  const origin = req.query.origin;
  if (!origin || !allowedOrigins.includes(origin))
    throw { status: 400, message: "Invalid client origin" };

  const csrf = crypto.randomUUID();
  res.cookie("oauth_state", csrf, { httpOnly: true, signed: true, sameSite: "lax", maxAge: 10 * 60 * 1000 });

  const validRedirect = validateRedirect(req.query.redirect);

  const state = `${csrf}|${origin}|${validRedirect ?? ""}`;

  res.redirect(buildLinkedInAuthUrl(state, {
    clientId: process.env.LINKEDIN_CLIENT_ID,
    redirectUri: process.env.LINKEDIN_REDIRECT_URI,
  }));
}

export async function handleLinkedInCallback(req, res) {
  const [csrf, origin, redirect] = (req.query.state ?? "").split("|");

  try {
    if (!csrf || csrf !== req.signedCookies.oauth_state)
      throw { status: 400, message: "Invalid OAuth state" };

    if (!origin || !allowedOrigins.includes(origin))
      throw { status: 400, message: "Invalid client origin" };

    if (req.query.error) {
      console.error("LinkedIn OAuth error:", req.query.error, req.query.error_description);
      throw { status: 400, message: "Authentication failed" };
    }

    const { code } = req.query;
    if (!code)
      throw { status: 400, message: "Missing authorization code" };

    const { sessionToken, maxAge } = await authenticateWithLinkedIn(code);

    res.clearCookie("oauth_state", { httpOnly: true, signed: true, sameSite: "lax" });
    res.cookie("session", sessionToken, {
      httpOnly: true,
      signed: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge,
    });

    const callbackUrl = redirect
      ? `${origin}/auth/callback?redirect=${encodeURIComponent(redirect)}`
      : `${origin}/auth/callback`;
    res.redirect(callbackUrl);
  } catch (err) {
    console.error("LinkedIn auth error:", err);
    const message = encodeURIComponent(err.status ? err.message : "Authentication failed");
    const errorOrigin = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
    res.redirect(`${errorOrigin}/error?type=auth&message=${message}`);
  }
}

export async function handleLogout(req, res) {
  await logout(req.signedCookies.session);
  res.clearCookie("session", {
    signed: true,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ ok: true });
}
