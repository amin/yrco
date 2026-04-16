export async function requireSetup(req, res, next) {
  if (!req.user?.setupComplete)
    return res.status(403).json({ error: "Setup not complete" });
  next();
}
