import * as userRepo from "../../repositories/userRepository.js";
import * as wordsRepo from "../../repositories/wordsRepository.js";

export const getMyWords = async (uid) => {
  const user = await userRepo.findById(uid);
  if (!user) throw { status: 404, message: "User not found" };
  return wordsRepo.findByIds(user.wordIds ?? []);
};
