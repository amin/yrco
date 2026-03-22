import * as userRepo from "../repositories/userRepository.js";
import { getWordsByIds } from "./wordsService.js";

export const getUser = (uid) => userRepo.findById(uid);

export const upsertUser = async (uid, profileData) => {
  const existing = await userRepo.findById(uid);
  const isNew = !existing;

  await userRepo.save(uid, {
    ...profileData,
    ...(isNew && { setupComplete: false, createdAt: new Date() }),
  });

  return { setupComplete: isNew ? false : existing.setupComplete };
};

export const completeSetup = (uid, { role, ...fields }) => {
  return userRepo.update(uid, { role, ...fields, setupComplete: true });
};

export const getMyWords = async (uid) => {
  const user = await userRepo.findById(uid);
  if (!user) return null;
  return getWordsByIds(user.wordIds ?? []);
};
