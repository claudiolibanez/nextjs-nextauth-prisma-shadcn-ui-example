import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import * as bcript from "bcrypt"

import { prisma } from "@/lib/db";

export const nextAuthOptions : NextAuthOptions = {
  
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials ?? {}

        // check to see if email and password is valid
        if (!email || !password) {
          // throw new Error("Dados do Login obrigatórios");

          throw new Error("Missing e-mail and/or password")
        }

        // check to see if user exists
        const user = await prisma.user.findUnique({
          where: {
            email
          }
        });

        if(!user || !user.password) {
          throw new Error("E-mail and/or password invalid");
        }

        // check to see if password match
        const passwordMatch = await bcript.compare(password, user.password);

        if (!passwordMatch) {
          throw new Error("E-mail and/or password invalid");
        }

        // return user object if everything is valid
        return Promise.resolve(user);
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      profile: async (profile: GoogleProfile) => {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: profile.email
          }
        });

        if (existingUser) {
          const user = await prisma.user.update({
            where: { id: existingUser.id },
            data: {
              name: profile.name,
              image: profile.picture,
            },
          });

          return {
            id: existingUser.id,
            name: user?.name,
            image: user?.image,
            email: user.email,
          }
        } else {
          const user = await prisma.user.create({
            data: {
              name: `${profile?.given_name} ${profile?.family_name}`,
              image: profile?.picture,
              email: profile.email,
            }
          })

          return {
            id: user.id,
            name: user.name,
            image: user.image,
            email: user.email,
          }
        }
      }
    })
  ],
  
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt"
  },

  pages: {
    // http://localhost:3000/api/auth/signin
    signIn: '/login',
  },

  callbacks: {
    jwt: async ({  token, user }) => {
      user && (token.user = user)

      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user as unknown as any

      return session;
    },
  },

  debug: process.env.NODE_ENV === "development"
};