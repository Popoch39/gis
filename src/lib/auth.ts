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
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/emails/send", {
        method: "POST",
        body: JSON.stringify({
          firstName: user.name,
          url
        })
      })
    }
  },

  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const updatedUrl = `${url}?verified=true`
      await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/emails/verify", {
        method: "POST",
        body: JSON.stringify({
          firstName: user.name,
          url: updatedUrl
        })
      })
    }
  },


  //providers
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    },
    // discord: {
    //   enabled: true,
    //   clientId: process.env.DISCORD_CLIENT_ID,
    //   clientSecret: process.env.DISCORD_CLIENT_SECRET
    // }
  }
})
