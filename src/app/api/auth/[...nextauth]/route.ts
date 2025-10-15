import NextAuth from "next-auth/next";
import type { User } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../../../../../lib/prisma";
import type { AdapterUser } from "next-auth/adapters";
//  /home/parikar/Projects/whisperdrop-2/src/app/api/auth/[...nextauth]/route.ts
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
  if (!user?.email) return false;

  try {
    // See if user exists
    let dbUser = await prisma.user.findUnique({ where: { email: user.email } });

    if (!dbUser) {
      // create partial user
      dbUser = await prisma.user.create({ data: { email: user.email } });
    }

    // Link new provider if account missing
    if (account && dbUser) {
      const existingAccount = await prisma.account.findFirst({
        where: {
          userId: dbUser.id,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        },
      });

      if (!existingAccount) {
        await prisma.account.create({
          data: {
            userId: dbUser.id,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            type: account.type,
            access_token: account.access_token,
            token_type: account.token_type,
            scope: account.scope,
            id_token: account.id_token,
            expires_at: account.expires_at,
            refresh_token: account.refresh_token,
          },
        });
      }
    }

    return true; // ✅ must return true for callback to succeed
  } catch (err) {
    console.error("SignIn error:", err);
    return false; // redirect to error page
  }
},

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, user }: { session: any; user: User|AdapterUser }) {
    if (session.user) {
        // fetch full user from DB
        const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
        session.user.id = user.id;
        session.user.username = dbUser?.username ?? null;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },

  session: {
    strategy: "database", // ✅ must be exact string
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
