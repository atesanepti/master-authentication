import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/email";

export const POST = async (req: NextRequest) => {
  const { email } = await req.json();

  if (!email)
    return NextResponse.json(
      { ok: false, message: "Email is missing" },
      { status: 400 }
    );

  const token = await generateToken(email);

  await sendVerificationEmail(token.email, token.token);

  return NextResponse.json(
    { ok: true, message: `Verification link sent at ${token.email}` },
    { status: 200 }
  );
};
