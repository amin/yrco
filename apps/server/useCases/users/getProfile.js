import * as userRepo from "../../repositories/userRepository.js";
import * as wordsRepo from "../../repositories/wordsRepository.js";
import { buildPublicProfile } from "../../helpers/buildPublicProfile.js";

export const getPublicProfile = async (username) => {
  const user = await userRepo.findByUsername(username);
  if (!user) throw { status: 404, message: "User not found" };
  const words = await wordsRepo.findByIds(user.wordIds ?? []);
  return buildPublicProfile(user, words);
};
