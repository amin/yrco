import * as userRepo from "../../repositories/userRepository.js";
import * as wordsRepo from "../../repositories/wordsRepository.js";
import { buildPublicProfile } from "../../services/profileService.js";

export const listConnections = async (uid) => {
  const user = await userRepo.findById(uid);
  if (!user) throw { status: 404, message: "User not found" };
  const users = await userRepo.findByIds(user.connectionIds ?? []);
  return Promise.all(
    users.map(async (u) => {
      const words = await wordsRepo.findByIds(u.wordIds ?? []);
      return buildPublicProfile(u, words);
    }),
  );
};
