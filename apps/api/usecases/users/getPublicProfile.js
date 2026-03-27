import * as userRepo from "../../repositories/userRepository.js";
import { publicProfileSchema } from "@colyr/lib";

export const getPublicProfile = async (username) => {
  const user = await userRepo.findByUsername(username);
  if (!user) throw { status: 404, message: "User not found" };
  return publicProfileSchema.parse({ ...user, traits: user.traitIds ?? [] });
};
