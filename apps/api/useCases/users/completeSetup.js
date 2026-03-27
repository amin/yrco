import * as userRepo from "../../repositories/userRepository.js";
import * as emailService from "../../services/emailService.js";

export const completeSetup = async (uid, data) => {
  const user = await userRepo.update(uid, { ...data, setupComplete: true });
  await emailService.sendWelcomeEmail({ to: user.email, firstName: user.firstName, traits: user.traitIds ?? [] });
};
