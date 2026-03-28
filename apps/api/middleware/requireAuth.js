import * as sessionRepo from "../repositories/sessionRepository.js";

export async function requireAuth(req, res, next) {
  const token = req.signedCookies.session;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const session = await sessionRepo.findByToken(token);
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  req.user = { uid: session.uid };
  next();
}
