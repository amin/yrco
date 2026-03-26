import * as userRepo from "../../repositories/userRepository.js";

export const completeSetup = (uid, { role, ...fields }) =>
  userRepo.update(uid, { role, ...fields, setupComplete: true });
