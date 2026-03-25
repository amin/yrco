import * as userRepo from "../../repositories/userRepository.js";
import * as wordsRepo from "../../repositories/wordsRepository.js";
import { buildPublicProfile } from "../../services/profileService.js";

export const listConnections = async (connectionIds) => {
  const users = await userRepo.findByIds(connectionIds ?? []);
  return Promise.all(
    users.map(async (u) => {
      const words = await wordsRepo.findByIds(u.wordIds ?? []);
      return buildPublicProfile(u, words);
    }),
  );
};
