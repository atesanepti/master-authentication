import { currentRole } from "@/lib/auth";
import { NextResponse } from "next/server";
import { UserRole } from "@prisma/client";

export const GET = async () => {
  const role: UserRole = await currentRole();

  if (role === UserRole.ADMIN) {
    return NextResponse.json(
      { success: "You have full access" },
      { status: 200 }
    );
  }

  return NextResponse.json({ error: "You have no access" }, { status: 403 });
};
