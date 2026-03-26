import { Resend } from "resend";

export const sendEmail = async ({ to, subject, html }) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: `${process.env.APP_NAME} <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    html,
  });
  if (error) throw { status: 500, message: "Failed to send email" };
};
