"use server";
import { z } from "zod";
import { loginSchema } from "@/schema";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { generateToken, generateTwoFAToken } from "@/lib/token";
import { getTwoFATokenByEmail } from "@/data/twofa";
import { getTwoFAConfirmationByUserId } from "./../data/twoFAConfirmation";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const { email, password, code } = values;

  const user = await db.user.findUnique({
    where: {
      email: values.email,
    },
  });

  if (user?.isTwoFA) {
    if (!code) {
      await generateTwoFAToken(user.email!);
      return { isTwoFA: true };
    } else {
      const exsistingCode = await getTwoFATokenByEmail(user?.email);
      if (!exsistingCode) return { error: "Invalid code" };

      const hasTokenValid = code === exsistingCode?.token;
      if (!hasTokenValid) return { error: "Incorrect code" };

      const hasExpired = new Date() > new Date(exsistingCode.expires);
      if (hasExpired) return { error: "Code was Expired" };

      const existingConfirmation = await getTwoFAConfirmationByUserId(user.id);

      if (!existingConfirmation) {
        await db.twoFactorAuthConfirmation.create({
          data: {
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        });
      }

      await db.twoFactorAuthToken.delete({
        where: {
          email: exsistingCode.email,
        },
      });
    }
  }

  try {
    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  } catch (error: unknown) {
    if (error.name !== "AccessDenied") {
      const credentialsError = error as CredentialsSignin;
      return { error: credentialsError?.cause?.err?.message };
    }
  }

  if (!user?.emailVerified) {
    await generateToken(user?.email);
    return { success: "Verification Link sent to your E-mail" };
  }

  return { success: "Logged in Successfull" };
};
