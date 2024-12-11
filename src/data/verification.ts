import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
  if (!email) return;
  try {
    const token = await db.verificationToken.findFirst({ where: { email } });

    if (!token) return null;

    return token;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  if (!token) return;
  try {
    const tokenData = await db.verificationToken.findUnique({
      where: {
        token,
      },
    });

    if (!tokenData) return null;

    return tokenData;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};
