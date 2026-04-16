import { getPublicUser, getAllUsers, completeUserSetup, updateUser, setEmailOptIn } from "../usecases/usersUseCases.js";
import { addUserConnection, removeUserConnection, getUserConnections } from "../usecases/connectionsUseCases.js";
import { setupSchema, usernameSchema, traitIdsSchema } from "@yrco/lib";

export async function handleGetPublicUser(req, res) {
  const result = usernameSchema.safeParse(req.params.username);
  if (!result.success) throw { status: 400, message: result.error.issues[0].message };

  res.json(await getPublicUser(result.data));
}

export async function handleGetAllUsers(req, res) {
  const page = parseInt(req.query.page);
  if (req.query.page !== undefined && (isNaN(page) || page < 1))
    throw { status: 400, message: "Invalid page number" };
  const search = (req.query.search?.trim() || "").slice(0, 100);
  res.json(await getAllUsers(page || 1, search));
}

export async function handleGetCurrentUser(req, res) {
  res.json(req.user);
}

export async function handleCompleteUserSetup(req, res) {
  const result = setupSchema.safeParse(req.body);
  if (!result.success)
    throw { status: 400, message: result.error.issues[0].message };

  await completeUserSetup(req.user.uid, result.data);
  res.json({ ok: true });
}

export async function handleAddUserConnection(req, res) {
  const parsed = usernameSchema.safeParse(req.body.username);
  if (!parsed.success) throw { status: 400, message: parsed.error.issues[0].message };

  await addUserConnection(req.user.uid, parsed.data);
  res.json({ ok: true });
}

export async function handleRemoveUserConnection(req, res) {
  const parsed = usernameSchema.safeParse(req.params.username);
  if (!parsed.success) throw { status: 400, message: parsed.error.issues[0].message };

  await removeUserConnection(req.user.uid, parsed.data);
  res.json({ ok: true });
}

export async function handleGetUserConnections(req, res) {
  res.json(await getUserConnections(req.user.connectionIds ?? []));
}

export async function handleSetEmailOptIn(req, res) {
  const { optIn } = req.body;
  if (typeof optIn !== "boolean") throw { status: 400, message: "optIn must be a boolean" };
  await setEmailOptIn(req.user.uid, optIn);
  res.json({ ok: true });
}

export async function handleUpdateUser(req, res) {
  const result = traitIdsSchema.safeParse(req.body.traitIds);
  if (!result.success) throw { status: 400, message: result.error.issues[0].message };

  res.json(await updateUser(req.user.uid, { traitIds: result.data }));
}
