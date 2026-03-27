import * as userRepo from "../../repositories/userRepository.js";
import * as traitsRepo from "../../repositories/traitRepository.js";
import * as emailService from "../../services/emailService.js";

export const completeSetup = async (uid, data) => {
  const user = await userRepo.update(uid, { ...data, setupComplete: true });
  const traits = await traitsRepo.findByIds(user.traitIds ?? []);
  await emailService.sendWelcomeEmail({ to: user.email, firstName: user.firstName, traits });
};
