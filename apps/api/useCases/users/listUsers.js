import * as userRepo from "../../repositories/userRepository.js";
import * as wordsRepo from "../../repositories/wordsRepository.js";
import { buildPublicProfile } from "../../helpers/buildPublicProfile.js";

export const listUsers = async (page, search, pageSize = 20) => {
  const candidates = search
    ? await userRepo.search(search, page, pageSize)
    : await userRepo.findAll(page, pageSize);
  const hasMore = candidates.length > pageSize;
  const slice = candidates.slice(0, pageSize);

  const allWords = await wordsRepo.findAll();
  const wordMap = Object.fromEntries(allWords.map((w) => [w.id, w]));
  const users = slice.map((user) => {
    const words = (user.wordIds ?? []).map((id) => wordMap[id]).filter(Boolean);
    return buildPublicProfile(user, words);
  });

  return { users, hasMore };
};
