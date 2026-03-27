import * as userRepo from "../../repositories/userRepository.js";
import { publicProfileSchema } from "@colyr/lib";

export const listUsers = async (page, search, pageSize = 20) => {
  const candidates = search
    ? await userRepo.search(search, page, pageSize)
    : await userRepo.findAll(page, pageSize);
  const hasMore = candidates.length > pageSize;
  const slice = candidates.slice(0, pageSize);
  return { users: slice.map((u) => publicProfileSchema.parse({ ...u, traits: u.traitIds ?? [] })), hasMore };
};
