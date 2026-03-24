import {
  findAccount,
  saveSetup,
  findMyWords,
  connectWithUser,
  disconnectFromUser,
} from "../services/accountService.js";
import { setupSchema, usernameSchema } from "@colyr/shared";

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

export async function addConnection(req, res) {
  const parsed = usernameSchema.safeParse(req.body.username);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0].message });

  const result = await connectWithUser(req.user.uid, parsed.data);
  if (result.error === "not_found") return res.status(404).json({ error: "User not found" });
  if (result.error === "self") return res.status(400).json({ error: "You cannot connect with yourself" });
  res.json({ ok: true });
}

export async function removeConnection(req, res) {
  const parsed = usernameSchema.safeParse(req.params.username);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0].message });

  const result = await disconnectFromUser(req.user.uid, parsed.data);
  if (result.error === "not_found") return res.status(404).json({ error: "User not found" });
  if (result.error === "self") return res.status(400).json({ error: "You cannot disconnect from yourself" });
  res.json({ ok: true });
}
