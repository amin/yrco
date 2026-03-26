export function requireAuth(req, res, next) {
  const uid = req.signedCookies.session;
  if (!uid) return res.status(401).json({ error: "Unauthorized" });
  req.user = { uid };
  next();
}
