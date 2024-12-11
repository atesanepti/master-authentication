import { db } from "@/lib/db";

export const getTwoFATokenByEmail = async (email) => {
  const twoFAToken = await db.twoFactorAuthToken.findUnique({
    where: {
      email,
    },
  });

  if (!twoFAToken) return null;

  return twoFAToken;
};
