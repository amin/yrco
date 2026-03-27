import * as userRepo from "../../repositories/userRepository.js";
import * as traitsRepo from "../../repositories/traitsRepository.js";
import { buildPublicProfiles } from "../../helpers/buildPublicProfile.js";

export const listUsers = async (page, search, pageSize = 20) => {
  const candidates = search
    ? await userRepo.search(search, page, pageSize)
    : await userRepo.findAll(page, pageSize);
  const hasMore = candidates.length > pageSize;
  const slice = candidates.slice(0, pageSize);

  const allTraits = await traitsRepo.findAll();
  const users = buildPublicProfiles(slice, allTraits);

  return { users, hasMore };
};
