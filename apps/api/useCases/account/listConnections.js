import * as userRepo from "../../repositories/userRepository.js";
import * as wordsRepo from "../../repositories/wordsRepository.js";
import { buildPublicProfile } from "../../helpers/buildPublicProfile.js";

export const listConnections = async (uid) => {
  const user = await userRepo.findById(uid);
  if (!user) throw { status: 404, message: "User not found" };
  const users = await userRepo.findByIds(user.connectionIds ?? []);

  const allWords = await wordsRepo.findAll();
  const wordMap = Object.fromEntries(allWords.map((w) => [w.id, w]));

  return users.map((u) => {
    const words = (u.wordIds ?? []).map((id) => wordMap[id]).filter(Boolean);
    return buildPublicProfile(u, words);
  });
};
