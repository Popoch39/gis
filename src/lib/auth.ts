import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7
  },
  emailAndPassword: {
    enabled: true
  }
})
