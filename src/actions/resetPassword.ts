"use server";

import { z } from "zod";
import bcryptjs from "bcryptjs";
import { resetPassSchema } from "@/schema";
import { getForgetTokenByToken } from "@/data/forget";
import { db } from "@/lib/db";

export const resetPassword = async (
  values: z.infer<typeof resetPassSchema>,
  token: string | null | undefined
) => {
  if (!token) return { error: "Invalid reset link" };

  const exsitingToken = await getForgetTokenByToken(token);

  if (!exsitingToken) return { error: "Invalid reset link" };

  if (new Date(exsitingToken.expires) < new Date()) {
    return { error: "Link was expired" };
  }

  const user = await db.user.findUnique({
    where: {
      email: exsitingToken.email,
    },
  });

  if (!user) return { error: "Invalid user credentials" };

  const { password } = values;

  const hasedPassword = await bcryptjs.hash(password, 10);

  try {
    const response = await db.$transaction([
      db.user.update({
        where: {
          email: user.email!,
        },
        data: {
          password: hasedPassword,
        },
      }),

      db.forgetPasswordToken.delete({
        where: {
          token: exsitingToken.token,
        },
      }),
    ]);
    if (!response) return { error: "Somting went wrong! Try aging" };
    return { success: "Your password changed" };
  } catch {
    return { error: "Somting went wrong! Try aging" };
  }
};
