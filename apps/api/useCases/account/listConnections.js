import * as userRepo from "../../repositories/userRepository.js";
import * as wordsRepo from "../../repositories/wordsRepository.js";
import { buildPublicProfiles } from "../../helpers/buildPublicProfile.js";

export const listConnections = async (uid) => {
  const user = await userRepo.findById(uid);
  if (!user) throw { status: 404, message: "User not found" };
  const users = await userRepo.findByIds(user.connectionIds ?? []);
  const allWords = await wordsRepo.findAll();
  return buildPublicProfiles(users, allWords);
};
