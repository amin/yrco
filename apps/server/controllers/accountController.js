import {
  findAccount,
  saveSetup,
  findMyWords,
  connectWithUser,
  disconnectFromUser,
  getConnections,
} from "../services/accountService.js";
import { setupSchema, usernameSchema } from "@colyr/shared";

export async function getAccount(req, res) {
  const user = await findAccount(req.user.uid);
  res.json(user);
}

export async function getWords(req, res) {
  const user = await findAccount(req.user.uid);
  res.json(await findMyWords(user.wordIds));
}

export async function completeSetup(req, res) {
  const result = setupSchema.safeParse(req.body);
  if (!result.success)
    throw { status: 400, message: result.error.issues[0].message };

  await saveSetup(req.user.uid, result.data);
  res.json({ ok: true });
}

export async function addConnection(req, res) {
  const parsed = usernameSchema.safeParse(req.body.username);
  if (!parsed.success) throw { status: 400, message: parsed.error.issues[0].message };

  await connectWithUser(req.user.uid, parsed.data);
  res.json({ ok: true });
}

export async function removeConnection(req, res) {
  const parsed = usernameSchema.safeParse(req.params.username);
  if (!parsed.success) throw { status: 400, message: parsed.error.issues[0].message };

  await disconnectFromUser(req.user.uid, parsed.data);
  res.json({ ok: true });
}

export async function listConnections(req, res) {
  const user = await findAccount(req.user.uid);
  res.json(await getConnections(user.connectionIds));
}
