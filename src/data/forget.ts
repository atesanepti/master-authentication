import { db } from "@/lib/db";

export const getForgetTokenByEmail = async (email: string) => {
  const forgetToken = await db.forgetPasswordToken.findFirst({
    where: {
      email,
    },
  });

  if (!forgetToken) return null;

  return forgetToken;
};

export const getForgetTokenByToken = async (token: string) => {
  const forgetToken = await db.forgetPasswordToken.findUnique({
    where: {
      token,
    },
  });

  if (!forgetToken) return null;

  return forgetToken;
};
