import * as userRepo from "../../repositories/userRepository.js";
import * as wordsRepo from "../../repositories/wordsRepository.js";
import { buildPublicProfile } from "../../helpers/buildPublicProfile.js";

export const listUsers = async (page, search, pageSize = 20) => {
  const candidates = search
    ? await userRepo.search(search, page, pageSize)
    : await userRepo.findAll(page, pageSize);
  const hasMore = candidates.length > pageSize;
  const slice = candidates.slice(0, pageSize);
  const users = await Promise.all(
    slice.map(async (user) => {
      const words = await wordsRepo.findByIds(user.wordIds ?? []);
      return buildPublicProfile(user, words);
    }),
  );
  return { users, hasMore };
};
