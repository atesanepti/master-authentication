"use server";
import { z } from "zod";
import { registerSchema } from "@/schema";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import bcryptjs from "bcryptjs";
import { generateToken } from "@/lib/token";

export const register = async (values: z.infer<typeof registerSchema>) => {
  try {
    const response = registerSchema.safeParse(values);
    if (!response.success) {
      return { error: response.error || "Invalid input!" };
    }

    const userIsExist = await getUserByEmail(response.data.email);

    if (userIsExist && !userIsExist.error) {
      return { error: "Email is already used" };
    }

    const hashedPassword = await bcryptjs.hash(response.data.password, 10);

    const newUser = await db.user.create({
      data: { ...response.data, password: hashedPassword },
    });

    //generate token and sent into email
    const token = await generateToken(newUser.email!);

    if (token) return { success: "Verification Link was sent to your E-mail" };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    console.log("ERROR ", error);
    return { error: "Registaion failed!" };
  }
};
