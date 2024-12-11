import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { getTwoFAConfirmationByUserId } from "./data/twoFAConfirmation";
import { getAccountByUserId } from "./data/account";

export const { handlers, signIn, signOut, auth} = NextAuth({
  session: {
    strategy: "jwt",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  adapter: PrismaAdapter(db),
  ...authConfig,
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (existingUser.error) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;

      token.role = existingUser.role;
      token.isTwoFA = existingUser.isTwoFA;

      const account = await getAccountByUserId(existingUser.id!);

      token.isOAuth = !!account;

      return token;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }
      if (session.user) {
        session.user.twoFA = token.isTwoFA;
        session.user.isOAuth = token.isOAuth;
      }
      return session;
    },

    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      // check is account e-mail verified or not?
      const existingUser = await db.user.findUnique({
        where: {
          id: user.id,
        },
      });

      if (!existingUser?.emailVerified) {
        return false;
      }

      // check for 2FA
      if (existingUser.isTwoFA) {
        const twoFAConfirmation = await getTwoFAConfirmationByUserId(
          existingUser.id
        );
        if (!twoFAConfirmation) return false;

        await db.twoFactorAuthConfirmation.delete({
          where: {
            userId: twoFAConfirmation.userId,
          },
        });
      }
      return true;
    },
  },

  pages: {
    signIn: "/login",
    error: "/error",
  },
});
