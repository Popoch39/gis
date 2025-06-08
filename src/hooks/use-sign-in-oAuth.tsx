import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

interface OauthProps {
  provider: "google" | "github" | "discord";
}

export default function useSignInOAuth() {
  const [isOAuthPending, setIsOAuthPending] = useState(false);

  const handleSignIn = async (provider: OauthProps["provider"]) => {
    await signIn.social({
      provider,
      callbackURL: "/",
      errorCallbackURL: "/auth/login/error",
      fetchOptions: {
        onRequest: () => {
          setIsOAuthPending(true);
        },
        onResponse: () => {
          setIsOAuthPending(false);
        },
        onError: (ctx) => {
          console.log(ctx.error);
          toast.error(ctx.error.message);
        },
        onSuccess: () => { },
      },
    });
  };

  return { handleSignIn, isOAuthPending };
}
