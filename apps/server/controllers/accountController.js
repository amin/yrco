import {
  getMyAccount,
  getMyWords,
  completeSetup,
  addConnection,
  removeConnection,
  listConnections,
} from "../useCases/account/index.js";
import { setupSchema, usernameSchema } from "@colyr/shared";

export async function handleGetAccount(req, res) {
  res.json(await getMyAccount(req.user.uid));
}

export async function handleGetWords(req, res) {
  res.json(await getMyWords(req.user.uid));
}

export async function handleCompleteSetup(req, res) {
  const result = setupSchema.safeParse(req.body);
  if (!result.success)
    throw { status: 400, message: result.error.issues[0].message };

  await completeSetup(req.user.uid, result.data);
  res.json({ ok: true });
}

export async function handleAddConnection(req, res) {
  const parsed = usernameSchema.safeParse(req.body.username);
  if (!parsed.success) throw { status: 400, message: parsed.error.issues[0].message };

  await addConnection(req.user.uid, parsed.data);
  res.json({ ok: true });
}

export async function handleRemoveConnection(req, res) {
  const parsed = usernameSchema.safeParse(req.params.username);
  if (!parsed.success) throw { status: 400, message: parsed.error.issues[0].message };

  await removeConnection(req.user.uid, parsed.data);
  res.json({ ok: true });
}

export async function handleListConnections(req, res) {
  res.json(await listConnections(req.user.uid));
}
