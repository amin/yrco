import * as userRepo from "../repositories/userRepository.js";
import { getWordsByIds } from "./wordsService.js";

export const findAccount = (uid) => userRepo.findById(uid);

export const saveSetup = (uid, { role, ...fields }) => {
  return userRepo.update(uid, { role, ...fields, setupComplete: true });
};

export const findMyWords = (wordIds) => getWordsByIds(wordIds ?? []);
