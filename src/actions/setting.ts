"use server";

import { getUserByEmail } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { settingSchema } from "@/schema";
import bcryptjs from "bcryptjs";

import { z } from "zod";

export const setting = async (values: z.infer<typeof settingSchema>) => {
  const { email } = await currentUser();

  const user = await getUserByEmail(email);

  if (!user || user?.error) return { error: "User not found" };

  if (values.name === user.name) {
    delete values.name;
  }

  if (values.email === user.email) {
    delete values.email;
  }

  const existingUserWithEmail = await getUserByEmail(values.email!);

  if (existingUserWithEmail) {
    return { error: "Email alredy used" };
  }

  if (values.role == user.role) {
    delete values.role;
  }

  if (values.isTwoFA == user.isTwoFA) {
    delete values.isTwoFA;
  }

  if (values.newPassword && values.oldPassword) {

    const isOldPassMatched = await bcryptjs.compare(
      values.oldPassword,
      user.password
    );

    if (!isOldPassMatched) return { error: "Invalid Password" };

    const isPasswordIsSame = await bcryptjs.compare(
      values.newPassword,
      user.password
    );

    if (isPasswordIsSame) {
      return { error: "You already have used this password" };
    }

    const hashedPassword = await bcryptjs.hash(values.newPassword, 10);

    values.password = hashedPassword;
  }

  delete values.newPassword;
  delete values.oldPassword;

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...values,
    },
  });

  return { success: "Setting Updated" };
};
