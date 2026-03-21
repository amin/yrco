import * as userRepo from "../repositories/userRepository.js";

export const getUser = (uid) => userRepo.findById(uid);

export const updateUser = (uid, data) => userRepo.update(uid, data);

export const upsertUser = async (uid, profileData) => {
  const existing = await userRepo.findById(uid);
  const isNewUser = !existing;

  await userRepo.save(uid, {
    ...profileData,
    ...(isNewUser && { setupComplete: false, createdAt: new Date() }),
  });

  return { isNewUser, setupComplete: isNewUser ? false : existing.setupComplete };
};
