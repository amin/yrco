import * as userRepo from "../../repositories/userRepository.js";
import * as wordsRepo from "../../repositories/wordsRepository.js";
import { buildPublicProfile } from "../../services/profileService.js";

const PAGE_SIZE = 20;

export const listUsers = async (page) => {
  const docs = await userRepo.findAll(page, PAGE_SIZE);
  const hasMore = docs.length > PAGE_SIZE;
  const slice = docs.slice(0, PAGE_SIZE);
  const users = await Promise.all(
    slice.map(async (user) => {
      const words = await wordsRepo.findByIds(user.wordIds ?? []);
      return buildPublicProfile(user, words);
    })
  );
  return { users, hasMore };
};
