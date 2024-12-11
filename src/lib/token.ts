import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import crypto from "crypto";

import {
  VerificationToken,
  ForgetPasswordToken,
  TwoFactorAuthToken,
} from "@prisma/client";
import { getVerificationTokenByEmail } from "@/data/verification";
import { sendForgetEmail, sendTowFACode, sendVerificationEmail } from "./email";
import { getForgetTokenByEmail } from "@/data/forget";
import { getTwoFATokenByEmail } from "@/data/twofa";

export const generateToken = async (email) => {
  const existingToken = await getVerificationTokenByEmail(email);
  const newToken = uuidv4();
  const expires: Date = new Date(Date.now() + 3600 * 1000);

  if (existingToken) {
    const token = await db.verificationToken.update({
      where: { token: existingToken.token },
      data: {
        token: newToken,
        expires: expires,
      },
    });
    await sendVerificationEmail(token.email, token.token);

    return token;
  }

  const tokenPayload: VerificationToken = {
    email: email,
    token: newToken,
    expires: expires,
  };

  const token = await db.verificationToken.create({
    data: {
      ...tokenPayload,
    },
  });

  await sendVerificationEmail(token.email, token.token);

  return token;
};

export const generateForgetToken = async (email: string) => {
  const existingToken = await getForgetTokenByEmail(email);
  const newToken = uuidv4();
  const expires: Date = new Date(Date.now() + 3600 * 1000);

  if (existingToken) {
    const token = await db.forgetPasswordToken.update({
      where: { token: existingToken.token },
      data: {
        token: newToken,
        expires: expires,
      },
    });
    await sendForgetEmail(token.email, token.token);

    return token;
  }

  const tokenPayload: ForgetPasswordToken = {
    email: email,
    token: newToken,
    expires: expires,
  };

  const token = await db.forgetPasswordToken.create({
    data: {
      ...tokenPayload,
    },
  });

  await sendForgetEmail(token.email, token.token);

  return token;
};

export const generateTwoFAToken = async (email: string) => {
  const existingToken = await getTwoFATokenByEmail(email);
  const newToken = crypto.randomInt(100000, 300000).toString();
  const expires: Date = new Date(Date.now() + 3600 * 1000);

  if (existingToken) {
    const token = await db.twoFactorAuthToken.update({
      where: { email: existingToken.email },
      data: {
        token: newToken,
        expires: expires,
      },
    });
    await sendTowFACode(token.email, token.token);
    return token;
  }

  const tokenPayload: TwoFactorAuthToken = {
    email: email,
    token: newToken,
    expires: expires,
  };

  const token = await db.twoFactorAuthToken.create({
    data: {
      ...tokenPayload,
    },
  });

  await sendTowFACode(token.email, token.token);

  return token;
};
