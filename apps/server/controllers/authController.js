import { buildLinkedInAuthUrl } from "../services/linkedInService.js";
import { handleLinkedInCallback } from "../useCases/auth/index.js";

export function handleLinkedinRedirect(_req, res) {
  const state = crypto.randomUUID();
  res.cookie("oauth_state", state, { httpOnly: true, signed: true, sameSite: "lax", maxAge: 10 * 60 * 1000 });
  res.redirect(buildLinkedInAuthUrl(state));
}

export async function handleLinkedinCallback(req, res) {
  try {
    const { code, state } = req.query;
    if (!state || state !== req.signedCookies.oauth_state)
      throw new Error("Invalid OAuth state");

    const { uid, setupComplete, username } = await handleLinkedInCallback(code);

    res.clearCookie("oauth_state", { signed: true });
    res.cookie("session", uid, {
      httpOnly: true,
      signed: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect(`${process.env.CLIENT_URL}${setupComplete === false ? "/setup" : `/@${username}`}`);
  } catch (err) {
    console.error("LinkedIn auth error:", err);
    res.redirect(`${process.env.CLIENT_URL}/error`);
  }
}

export function handleLogout(_req, res) {
  res.clearCookie("session", { signed: true });
  res.json({ ok: true });
}
