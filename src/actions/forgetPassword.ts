"use server";
import { db } from "@/lib/db";
import { generateForgetToken } from "@/lib/token";
import { forgetPassSchema } from "@/schema";
import { z } from "zod";

export const forgetPassword = async (
  values: z.infer<typeof forgetPassSchema>
) => {
  const { email } = values;

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) return { error: "Account doesn't exist with this E-mail" };

  await generateForgetToken(user.email!);

  return { success: "Reset link sent to your E-mail" };
};
