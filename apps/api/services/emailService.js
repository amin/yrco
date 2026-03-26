import React from "react";
import { Resend } from "resend";
import { render } from "@react-email/render";
import WelcomeEmail from "../emails/WelcomeEmail.js";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  const { error } = await resend.emails.send({
    from: `${process.env.APP_NAME} <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    html,
  });
  if (error) throw { status: 500, message: "Failed to send email" };
};

export const sendWelcomeEmail = async ({ to, firstName, words }) => {
  const html = await render(React.createElement(WelcomeEmail, { firstName, words }));
  await sendEmail({ to, subject: `Welcome to ${process.env.APP_NAME}`, html });
};
