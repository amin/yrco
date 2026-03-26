import crypto from "crypto";
import { processLinkedInCallback, redirectToLinkedIn } from "../useCases/auth/index.js";
import { buildPostAuthRedirect } from "../helpers/buildPostAuthRedirect.js";

export function handleLinkedinRedirect(req, res) {
  const state = crypto.randomUUID();
  res.cookie("oauth_state", state, { httpOnly: true, signed: true, sameSite: "lax", maxAge: 10 * 60 * 1000 });

  const redirect = req.query.redirect;
  if (redirect && redirect.startsWith("/") && !redirect.startsWith("//") && redirect.length <= 200) {
    res.cookie("post_auth_redirect", redirect, { httpOnly: true, signed: true, sameSite: "lax", maxAge: 10 * 60 * 1000 });
  }

  res.redirect(redirectToLinkedIn(state));
}

export async function handleLinkedinCallback(req, res) {
  try {
    const { code, state } = req.query;
    if (!state || state !== req.signedCookies.oauth_state)
      throw { status: 400, message: "Invalid OAuth state" };

    const { uid, setupComplete, username } = await processLinkedInCallback(code);

    res.clearCookie("oauth_state", { signed: true });
    res.cookie("session", uid, {
      httpOnly: true,
      signed: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const postAuthRedirect = req.signedCookies.post_auth_redirect;
    res.clearCookie("post_auth_redirect", { signed: true });

    const redirectTo = buildPostAuthRedirect(setupComplete, username, postAuthRedirect);
    res.redirect(`${process.env.CLIENT_URL}${redirectTo}`);
  } catch (err) {
    console.error("LinkedIn auth error:", err);
    res.redirect(`${process.env.CLIENT_URL}/error`);
  }
}

export function handleLogout(_req, res) {
  res.clearCookie("session", { signed: true });
  res.json({ ok: true });
}
