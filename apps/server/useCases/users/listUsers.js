import * as userRepo from "../../repositories/userRepository.js";
import * as wordsRepo from "../../repositories/wordsRepository.js";
import { buildPublicProfile } from "../../services/profileService.js";

const PAGE_SIZE = 20;

export const listUsers = async (page, search) => {
  let candidates;
  if (search) {
    const q = search.toLowerCase();
    const all = await userRepo.fetchAll();
    const filtered = all.filter((u) =>
      u.username?.toLowerCase().includes(q) ||
      u.firstName?.toLowerCase().includes(q) ||
      u.lastName?.toLowerCase().includes(q) ||
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) ||
      u.organizationName?.toLowerCase().includes(q)
    );
    const start = (page - 1) * PAGE_SIZE;
    candidates = filtered.slice(start, start + PAGE_SIZE + 1);
  } else {
    candidates = await userRepo.findAll(page, PAGE_SIZE);
  }
  const hasMore = candidates.length > PAGE_SIZE;
  const slice = candidates.slice(0, PAGE_SIZE);
  const users = await Promise.all(
    slice.map(async (user) => {
      const words = await wordsRepo.findByIds(user.wordIds ?? []);
      return buildPublicProfile(user, words);
    })
  );
  return { users, hasMore };
};
