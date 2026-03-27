import {
  getMyAccount,
  getMyTraits,
  completeSetup,
  addConnection,
  removeConnection,
  listConnections,
  updateProfile,
} from "../useCases/account/index.js";
import { setupSchema, usernameSchema, traitIdsSchema } from "@colyr/lib";

export async function handleGetAccount(req, res) {
  res.json(await getMyAccount(req.user.uid));
}

export async function handleGetTraits(req, res) {
  res.json(await getMyTraits(req.user.uid));
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

export async function handleUpdateProfile(req, res) {
  const result = traitIdsSchema.safeParse(req.body.traitIds);
  if (!result.success) throw { status: 400, message: result.error.issues[0].message };

  res.json(await updateProfile(req.user.uid, { traitIds: result.data }));
}
