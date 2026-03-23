import * as userRepo from "../repositories/userRepository.js";
import { getWordsByIds } from "./wordsService.js";
import { publicProfileSchema } from "@colyr/shared";

export const getPublicProfile = async (username) => {
  const user = await userRepo.findByUsername(username);
  if (!user) return null;
  const words = await getWordsByIds(user.wordIds ?? []);
  return publicProfileSchema.parse({ ...user, words });
};
