import * as userRepo from "../../repositories/userRepository.js";
import { getWordsByIds } from "../words/getWordsByIds.js";

export const getMyWords = async (uid) => {
  const user = await userRepo.findById(uid);
  if (!user) throw { status: 404, message: "User not found" };
  return getWordsByIds(user.wordIds ?? []);
};
