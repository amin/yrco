import {
  findAccount,
  saveSetup,
  findMyWords,
} from "../services/accountService.js";
import { setupSchema } from "@colyr/shared";

export async function getAccount(req, res) {
  const user = await findAccount(req.user.uid);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
}

export async function getWords(req, res) {
  const user = await findAccount(req.user.uid);
  if (!user) return res.status(404).json({ error: "User not found" });
  const words = await findMyWords(user.wordIds);
  res.json(words);
}

export async function completeSetup(req, res) {
  const result = setupSchema.safeParse(req.body);
  if (!result.success)
    return res.status(400).json({ error: result.error.issues[0].message });

  await saveSetup(req.user.uid, result.data);
  res.json({ ok: true });
}
