import React from "react";
import resend from "../lib/resend.js";
import { render } from "@react-email/render";
import WelcomeEmail from "../emails/WelcomeEmail.js";

const sendEmail = async ({ to, subject, html }) => {
  const { error } = await resend.emails.send({
    from: `${process.env.APP_NAME} <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    html,
  });
  if (error) throw { status: 500, message: "Failed to send email" };
};

export const sendWelcomeEmail = async ({ to, firstName, traits }) => {
  const html = await render(React.createElement(WelcomeEmail, { firstName, traits }));
  await sendEmail({ to, subject: `Welcome to ${process.env.APP_NAME}`, html });
};
