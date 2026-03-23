import { getUser, completeSetup, getMyWords, getPublicProfile } from "../services/usersService.js";
import { setupSchema, usernameSchema } from "@colyr/shared";

export async function getMe(req, res) {
  const user = await getUser(req.user.uid);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
}

export async function setupComplete(req, res) {
  const result = setupSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.issues[0].message });

  await completeSetup(req.user.uid, result.data);
  res.json({ ok: true });
}

export async function getMyWordsHandler(req, res) {
  const words = await getMyWords(req.user.uid);
  if (!words) return res.status(404).json({ error: "User not found" });
  res.json(words);
}

export async function getProfile(req, res) {
  const result = usernameSchema.safeParse(req.params.username);
  if (!result.success) return res.status(400).json({ error: result.error.issues[0].message });

  const profile = await getPublicProfile(result.data);
  if (!profile) return res.status(404).json({ error: "User not found" });
  res.json(profile);
}
