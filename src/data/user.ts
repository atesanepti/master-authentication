import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  if (!email) {
    return false;
  }

  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if(!user) return null;

    return user;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return { error: "User not found" };
  }
};

export const getUserById = async (id: string) => {
  if (!id) {
    return false;
  }

  try {
    const user = await db.user.findUnique({
      where: { id: id },
    });
    if (!user) return { error: "User not found" };

    return user;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return { error: "User not found" };
  }
};
