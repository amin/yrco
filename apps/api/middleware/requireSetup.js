import * as userRepo from "../repositories/userRepository.js";

export async function requireSetup(req, res, next) {
  const user = await userRepo.findById(req.user.uid);
  if (!user?.setupComplete) return res.status(403).json({ error: "Setup not complete" });
  req.user = user;
  next();
}
