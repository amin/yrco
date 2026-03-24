import * as userRepo from "../repositories/userRepository.js";
import { getWordsByIds } from "./wordsService.js";

export const findAccount = (uid) => userRepo.findById(uid);

export const saveSetup = (uid, { role, ...fields }) => {
  return userRepo.update(uid, { role, ...fields, setupComplete: true });
};

export const findMyWords = (wordIds) => getWordsByIds(wordIds ?? []);

const resolveTargetUid = async (uid, username) => {
  const targetUid = await userRepo.findUidByUsername(username);
  if (!targetUid) return { error: "not_found" };
  if (targetUid === uid) return { error: "self" };
  return { targetUid };
};

export const connectWithUser = async (uid, username) => {
  const resolved = await resolveTargetUid(uid, username);
  if (resolved.error) return resolved;
  await userRepo.addConnection(uid, resolved.targetUid);
  return { ok: true };
};

export const disconnectFromUser = async (uid, username) => {
  const resolved = await resolveTargetUid(uid, username);
  if (resolved.error) return resolved;
  await userRepo.removeConnection(uid, resolved.targetUid);
  return { ok: true };
};
