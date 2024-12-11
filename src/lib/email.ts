import nodeMailer, { SendMailOptions } from "nodemailer";

const transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

const domain = process.env.NEXT_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  if (!email || !token) return;

  const confirmLink = `${domain}/new-verification?token=${token}`;

  const options: SendMailOptions = {
    from: process.env.SMTP_USERNAME,
    to: email,
    subject: "Account Verification",
    html: `Verify your account with the help of <a href=${confirmLink}>Verify</a>`,
  };

  try {
   await transporter.sendMail(options);

    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    console.log("ERROR d", error);
    return false;
  }
};

export const sendForgetEmail = async (email: string, token: string) => {
  if (!email || !token) return;

  const confirmLink = `${domain}/reset-password?token=${token}`;

  const options: SendMailOptions = {
    from: process.env.SMTP_USERNAME,
    to: email,
    subject: "Reset your password",
    html: `Change Your password from <a href=${confirmLink}>here</a>`,
  };

  try {
    await transporter.sendMail(options);

    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    console.log("ERROR", error);
    return false;
  }
};

export const sendTowFACode = async (email: string, code: string) => {
  if (!email || !code) return;

  const options: SendMailOptions = {
    from: process.env.SMTP_USERNAME,
    to: email,
    subject: "2FA code",
    html: `Use this ${code} for login `,
  };

  try {
    await transporter.sendMail(options);

    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    console.log("ERROR", error);
    return false;
  }
};
