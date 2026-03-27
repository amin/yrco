import * as userRepo from "../../repositories/userRepository.js";
import { buildPublicProfiles } from "../../helpers/buildPublicProfile.js";

export const listConnections = async (uid) => {
  const user = await userRepo.findById(uid);
  if (!user) throw { status: 404, message: "User not found" };
  const users = await userRepo.findByIds(user.connectionIds ?? []);
  return buildPublicProfiles(users);
};
