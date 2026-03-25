import * as userRepo from "../../../repositories/userRepository.js";
import { generateUsernameBase } from "../../../helpers/generateUsernameBase.js";

const generateUsername = async (firstName, lastName, uid) => {
  const base = generateUsernameBase(firstName, lastName);
  if (await userRepo.claimUsername(base, uid)) return base;

  let n = 1;
  while (!(await userRepo.claimUsername(`${base}${n}`, uid))) n++;
  return `${base}${n}`;
};

export const upsertUser = async (uid, profileData) => {
  const existing = await userRepo.findById(uid);

  if (existing) {
    await userRepo.save(uid, profileData);
    return { setupComplete: existing.setupComplete, username: existing.username };
  }

  const username = await generateUsername(profileData.firstName, profileData.lastName, uid);
  await userRepo.save(uid, {
    ...profileData,
    setupComplete: false,
    createdAt: new Date(),
    username,
  });
  return { setupComplete: false, username };
};
