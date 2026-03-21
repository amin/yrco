import { getUser, completeSetup, getMyWords } from "../services/usersService.js";

export async function getMe(req, res) {
  const user = await getUser(req.user.uid);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
}

export async function setupComplete(req, res) {
  try {
    await completeSetup(req.user.uid, req.body);
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getMyWordsHandler(req, res) {
  const words = await getMyWords(req.user.uid);
  if (!words) return res.status(404).json({ error: "User not found" });
  res.json(words);
}
