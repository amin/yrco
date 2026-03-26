import * as userRepo from "../../repositories/userRepository.js";
import * as wordsRepo from "../../repositories/wordsRepository.js";
import * as emailService from "../../services/emailService.js";

export const completeSetup = async (uid, data) => {
  const user = await userRepo.update(uid, { ...data, setupComplete: true });
  const words = await wordsRepo.findByIds(user.wordIds ?? []);
  await emailService.sendWelcomeEmail({ to: user.email, firstName: user.firstName, words });
};
