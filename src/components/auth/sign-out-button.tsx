"use client"

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignOutButton() {
  const router = useRouter();

  const handleClick = async () => {
    await signOut({
      fetchOptions: {
        onError: (ctx) => {
          console.log(ctx.error);
          toast.error(ctx.error.message)
        },
        onSuccess: () => {
          router.push("/auth/login")
        }
      }
    });
  }

  return (
    <Button onClick={handleClick}>
      Sign Out
    </Button>
  )
}

