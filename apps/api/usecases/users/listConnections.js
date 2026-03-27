import * as userRepo from "../../repositories/userRepository.js";
import { publicProfileSchema } from "@colyr/lib";

export const listConnections = async (connectionIds) => {
  const users = await userRepo.findByIds(connectionIds);
  return users.map((u) => publicProfileSchema.parse({ ...u, traits: u.traitIds ?? [] }));
};
