import * as userRepo from "../repositories/userRepository.js";
import { getWordsByIds } from "./wordsService.js";

export const getPublicProfile = async (username) => {
  const user = await userRepo.findByUsername(username);
  if (!user) return null;
  const { name, firstName, lastName, picture, username: u, wordIds, website } = user;
  const words = await getWordsByIds(wordIds ?? []);
  return { name, firstName, lastName, picture, username: u, website, words };
};
