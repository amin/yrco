import * as userRepo from "../repositories/userRepository.js";
import { publicProfileSchema } from "@colyr/lib";

const resolveTargetUid = async (uid, username) => {
  const targetUid = await userRepo.findUidByUsername(username);
  if (!targetUid) throw { status: 404, message: "User not found" };
  if (targetUid === uid) throw { status: 400, message: "You cannot connect with yourself" };
  return targetUid;
};

export const addUserConnection = async (uid, username) => {
  const targetUid = await resolveTargetUid(uid, username);
  await userRepo.addConnection(uid, targetUid);
};

export const removeUserConnection = async (uid, username) => {
  const targetUid = await resolveTargetUid(uid, username);
  await userRepo.removeConnection(uid, targetUid);
};

export const getUserConnections = async (connectionIds) => {
  const users = await userRepo.findByIds(connectionIds);
  return users.map((u) => publicProfileSchema.parse({ ...u, traits: u.traitIds ?? [] }));
};
