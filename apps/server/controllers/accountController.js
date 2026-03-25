import * as accountUseCases from "../useCases/account/index.js";
import { setupSchema, usernameSchema } from "@colyr/shared";

export async function getAccount(req, res) {
  res.json(await accountUseCases.getMyAccount(req.user.uid));
}

export async function getWords(req, res) {
  res.json(await accountUseCases.getMyWords(req.user.uid));
}

export async function completeSetup(req, res) {
  const result = setupSchema.safeParse(req.body);
  if (!result.success)
    throw { status: 400, message: result.error.issues[0].message };

  await accountUseCases.completeSetup(req.user.uid, result.data);
  res.json({ ok: true });
}

export async function addConnection(req, res) {
  const parsed = usernameSchema.safeParse(req.body.username);
  if (!parsed.success) throw { status: 400, message: parsed.error.issues[0].message };

  await accountUseCases.addConnection(req.user.uid, parsed.data);
  res.json({ ok: true });
}

export async function removeConnection(req, res) {
  const parsed = usernameSchema.safeParse(req.params.username);
  if (!parsed.success) throw { status: 400, message: parsed.error.issues[0].message };

  await accountUseCases.removeConnection(req.user.uid, parsed.data);
  res.json({ ok: true });
}

export async function listConnections(req, res) {
  const user = await accountUseCases.getMyAccount(req.user.uid);
  res.json(await accountUseCases.listConnections(user.connectionIds));
}
