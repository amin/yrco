import {
  getPublicProfile,
  listUsers,
  getMyAccount,
  getMyTraits,
  completeSetup,
  addConnection,
  removeConnection,
  listConnections,
  updateProfile,
} from "../useCases/users/index.js";
import { setupSchema, usernameSchema, traitIdsSchema } from "@colyr/lib";

export async function handleGetProfile(req, res) {
  const result = usernameSchema.safeParse(req.params.username);
  if (!result.success) throw { status: 400, message: result.error.issues[0].message };

  res.json(await getPublicProfile(result.data));
}

export async function handleListUsers(req, res) {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const search = req.query.search?.trim() || "";
  res.json(await listUsers(page, search));
}

export async function handleGetMe(req, res) {
  res.json(await getMyAccount(req.user.uid));
}

export async function handleGetMyTraits(req, res) {
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
