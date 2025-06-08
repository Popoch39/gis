import { createAuthClient } from "better-auth/react";
const authClient = createAuthClient({
	baseURL: process.env.BASE_AUTH_URL,
});

export const { signUp, signOut, signIn, useSession, forgetPassword } = authClient;
