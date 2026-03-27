import * as userRepo from "../../repositories/userRepository.js";
import * as traitsRepo from "../../repositories/traitRepository.js";
import { buildPublicProfile } from "../../helpers/buildPublicProfile.js";

export const getPublicProfile = async (username) => {
  const user = await userRepo.findByUsername(username);
  if (!user) throw { status: 404, message: "User not found" };
  const traits = await traitsRepo.findByIds(user.traitIds ?? []);
  return buildPublicProfile(user, traits);
};
