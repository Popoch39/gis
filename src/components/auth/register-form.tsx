"use client"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";

export default function RegisterForm() {

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log({ name, email, password })
    await signUp.email({
      name,
      email,
      password
    },
      {
        onRequest: () => { },
        onResponse: () => { },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => { }
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">
          Name
        </Label>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">
          Email
        </Label>
        <Input
          type="text"
          name="email"
          id="email"
          placeholder="email"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">
          Password
        </Label>
        <Input
          type="text"
          name="password"
          id="password"
          placeholder="Password"
          required
        />
      </div>
      <button type="submit" className="w-full">
        Register
      </button>
    </form>
  )
}
