import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { db } from "./lib/db";
import bcryptjs from "bcryptjs";

export default {
  providers: [
    Credentials({
      name: "credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) {
          throw new Error("Invalid credentials");
        }

        try {
          const user = await db.user.findUnique({ where: { email } });
          if (!user) {
            throw new Error(
              "User not found. Please create an account before signing in."
            );
          }

          const passwordMatch = await bcryptjs.compare(
            password,
            user.password!
          );
          if (!passwordMatch) {
            throw new Error("Invalid password.");
          }

          return user;
        } catch (error) {
          throw error;
        }
      },
    }),
    Github({
      clientId: process.env.GITHUB_OAUTH_CLIENT_ID,
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
