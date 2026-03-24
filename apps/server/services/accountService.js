import * as userRepo from "../repositories/userRepository.js";
import { getWordsByIds } from "./wordsService.js";
import { publicProfileSchema } from "@colyr/shared";

export const findAccount = async (uid) => {
  const user = await userRepo.findById(uid);
  if (!user) throw { status: 404, message: "User not found" };
  return user;
};

export const saveSetup = (uid, { role, ...fields }) => {
  return userRepo.update(uid, { role, ...fields, setupComplete: true });
};

export const findMyWords = (wordIds) => getWordsByIds(wordIds ?? []);

const resolveTargetUid = async (uid, username) => {
  const targetUid = await userRepo.findUidByUsername(username);
  if (!targetUid) throw { status: 404, message: "User not found" };
  if (targetUid === uid) throw { status: 400, message: "You cannot connect with yourself" };
  return targetUid;
};

export const connectWithUser = async (uid, username) => {
  const targetUid = await resolveTargetUid(uid, username);
  await userRepo.addConnection(uid, targetUid);
};

export const disconnectFromUser = async (uid, username) => {
  const targetUid = await resolveTargetUid(uid, username);
  await userRepo.removeConnection(uid, targetUid);
};

export const getConnections = async (connectionIds) => {
  const users = await userRepo.findByIds(connectionIds ?? []);
  const results = await Promise.all(
    users.map(async (u) => {
      const words = await getWordsByIds(u.wordIds ?? []);
      return publicProfileSchema.parse({ ...u, words });
    })
  );
  return results;
};
