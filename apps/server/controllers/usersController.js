import { getUser, updateUser } from "../services/usersService.js";
import { getWordsByIds } from "../services/wordsService.js";
import { setupSchema } from "@yingle/shared";

export async function getMe(req, res) {
  const user = await getUser(req.user.uid);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
}

export async function completeSetup(req, res) {
  const result = setupSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.issues[0].message });
  }

  const { role, ...fields } = result.data;
  await updateUser(req.user.uid, { role, ...fields, setupComplete: true });

  res.json({ ok: true });
}

export async function getMyWords(req, res) {
  const user = await getUser(req.user.uid);
  if (!user) return res.status(404).json({ error: "User not found" });

  const words = await getWordsByIds(user.wordIds ?? []);
  res.json(words);
}
