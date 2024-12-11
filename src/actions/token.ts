"use server";
import { getVerificationTokenByToken } from "@/data/verification";
import { db } from "@/lib/db";

export const verifyToken = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (
    !existingToken ||
    (existingToken.token && existingToken.token !== token)
  ) {
    return { error: "Invalid token!" };
  }

  // //check token expires
  if (new Date() > new Date(existingToken.expires)) {
    return { error: "Token was expired!" };
  }

  await db.$transaction([
    db.user.update({
      where: {
        email: existingToken.email,
      },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    }),

    db.verificationToken.delete({
      where: { token },
    }),
  ]);

  return { success: "Email Verified" };
};
