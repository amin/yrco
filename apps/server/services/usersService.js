import * as userRepo from "../repositories/userRepository.js";
import { getWordsByIds } from "./wordsService.js";

export const getUser = (uid) => userRepo.findById(uid);

export const getPublicProfile = async (username) => {
  const user = await userRepo.findByUsername(username);
  if (!user) return null;
  const { name, firstName, lastName, picture, username: u, wordIds, website } = user;
  return { name, firstName, lastName, picture, username: u, wordIds, website };
};

const generateUsername = async (firstName) => {
  const base = firstName.toLowerCase();
  if (!(await userRepo.isUsernameTaken(base))) return base;

  let n = 1;
  while (await userRepo.isUsernameTaken(`${base}${n}`)) n++;
  return `${base}${n}`;
};

export const upsertUser = async (uid, profileData) => {
  const existing = await userRepo.findById(uid);
  const isNew = !existing;

  await userRepo.save(uid, {
    ...profileData,
    ...(isNew && {
      setupComplete: false,
      createdAt: new Date(),
      username: await generateUsername(profileData.firstName),
    }),
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
