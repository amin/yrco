import * as userRepo from "../../repositories/userRepository.js";
import * as wordsRepo from "../../repositories/wordsRepository.js";
import { buildPublicProfile } from "../../services/profileService.js";
import { filterBySearch } from "../../services/userService.js";

export const listUsers = async (page, search, pageSize = 20) => {
  let candidates;
  if (search) {
    const all = await userRepo.fetchAll();
    const filtered = filterBySearch(all, search);
    const start = (page - 1) * pageSize;
    candidates = filtered.slice(start, start + pageSize + 1);
  } else {
    candidates = await userRepo.findAll(page, pageSize);
  }
  const hasMore = candidates.length > pageSize;
  const slice = candidates.slice(0, pageSize);
  const users = await Promise.all(
    slice.map(async (user) => {
      const words = await wordsRepo.findByIds(user.wordIds ?? []);
      return buildPublicProfile(user, words);
    })
  );
  return { users, hasMore };
};
