import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        nip: {
          label: "NIP",
          type: "text",
          placeholder: "Masukkan NIP Anda",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Masukkan password Anda",
        },
      },
      async authorize(credentials) {
        if (!credentials?.nip || !credentials?.password) {
          throw new Error("NIP dan password wajib diisi");
        }

        const user = await prisma.user.findUnique({
          where: { nip: credentials.nip },
        });

        if (!user) {
          throw new Error("NIP tidak ditemukan dalam sistem");
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Password yang Anda masukkan salah");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          nip: user.nip,
          hasVoted: user.hasVoted,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 jam
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.nip = (user as any).nip;
        token.hasVoted = (user as any).hasVoted;
      }

      // Memperbarui token saat sesi di-update (misalnya setelah voting)
      if (trigger === "update" && session) {
        token.hasVoted = session.hasVoted;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.nip = token.nip as string;
        session.user.hasVoted = token.hasVoted as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
