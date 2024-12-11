import { db } from "@/lib/db";

export const getTwoFAConfirmationByUserId = async(userId: string) => {
  const twoFAConfirmation = await db.twoFactorAuthConfirmation.findUnique({
    where: {
      userId,
    },
  });

  if (!twoFAConfirmation) return null;

  return twoFAConfirmation;
};
