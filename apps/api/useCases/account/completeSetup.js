import React from "react";
import * as userRepo from "../../repositories/userRepository.js";
import * as wordsRepo from "../../repositories/wordsRepository.js";
import * as emailService from "../../services/emailService.js";
import { render } from "@react-email/render";
import WelcomeEmail from "../../emails/WelcomeEmail.js";

export const completeSetup = async (uid, { role, ...fields }) => {
  await userRepo.update(uid, { role, ...fields, setupComplete: true });
  const user = await userRepo.findById(uid);
  const words = await wordsRepo.findByIds(user.wordIds ?? []);
  const html = await render(React.createElement(WelcomeEmail, { firstName: user.firstName, words }));
  await emailService.sendEmail({
    to: user.email,
    subject: `Welcome to ${process.env.APP_NAME}`,
    html,
  });
};
