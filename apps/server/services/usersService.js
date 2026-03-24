import * as userRepo from "../repositories/userRepository.js";
import { getWordsByIds } from "./wordsService.js";
import { publicProfileSchema } from "@colyr/shared";

export const getPublicProfile = async (username) => {
  const user = await userRepo.findByUsername(username);
  if (!user) throw { status: 404, message: "User not found" };
  const words = await getWordsByIds(user.wordIds ?? []);
  return publicProfileSchema.parse({ ...user, words });
};
