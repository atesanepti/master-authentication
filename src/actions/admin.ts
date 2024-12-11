"use server"
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
export const serverAction = async () => {
  const role: UserRole = await currentRole();
  console.log("ROLE ", role)
  if (role === UserRole.ADMIN) {
    return { success: "You have full access" };
  }

  return { error: "You have not access" };
};
