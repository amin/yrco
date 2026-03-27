import * as userRepo from "../../repositories/userRepository.js";
import { buildPublicProfile } from "../../helpers/buildPublicProfile.js";

export const getPublicProfile = async (username) => {
  const user = await userRepo.findByUsername(username);
  if (!user) throw { status: 404, message: "User not found" };
  return buildPublicProfile(user, user.traitIds ?? []);
};
