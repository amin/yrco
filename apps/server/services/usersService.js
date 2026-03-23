import * as userRepo from "../repositories/userRepository.js";
import { getWordsByIds } from "./wordsService.js";

export const getUser = (uid) => userRepo.findById(uid);

export const getPublicProfile = async (username) => {
  const user = await userRepo.findByUsername(username);
  if (!user) return null;
  const { name, firstName, lastName, picture, username: u, wordIds, website } = user;
  const words = await getWordsByIds(wordIds ?? []);
  return { name, firstName, lastName, picture, username: u, website, words };
};

const generateUsername = async (firstName, uid) => {
  const base = firstName.toLowerCase().replace(/[^a-z0-9_]/g, "");
  if (await userRepo.claimUsername(base, uid)) return base;

  let n = 1;
  while (!(await userRepo.claimUsername(`${base}${n}`, uid))) n++;
  return `${base}${n}`;
};

export const upsertUser = async (uid, profileData) => {
  const existing = await userRepo.findById(uid);
  const isNew = !existing;
  const username = isNew ? await generateUsername(profileData.firstName, uid) : existing.username;

  await userRepo.save(uid, {
    ...profileData,
    ...(isNew && { setupComplete: false, createdAt: new Date(), username }),
  });

  return { setupComplete: isNew ? false : existing.setupComplete, username };
};

export const completeSetup = (uid, { role, ...fields }) => {
  return userRepo.update(uid, { role, ...fields, setupComplete: true });
};

export const getMyWords = async (uid) => {
  const user = await userRepo.findById(uid);
  if (!user) return null;
  return getWordsByIds(user.wordIds ?? []);
};
