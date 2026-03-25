import * as userRepo from "../../repositories/userRepository.js";
import { getWordsByIds } from "../words/getWordsByIds.js";
import { buildPublicProfile } from "../../services/profileService.js";

export const getPublicProfile = async (username) => {
  const user = await userRepo.findByUsername(username);
  if (!user) throw { status: 404, message: "User not found" };
  const words = await getWordsByIds(user.wordIds ?? []);
  return buildPublicProfile(user, words);
};
