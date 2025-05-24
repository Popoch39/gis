import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function VerificationNeededPage() {
const session = await auth.api.getSession({
headers: await headers()
});

if (session?.user.emailVerified) {
redirect("/profile");
}

return (
<div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
  <div className="w-full max-w-sm md:max-w-3xl">
    <h1 className="text-2xl font-bold">Verification needed</h1>
    <p>Please check your email to verify your account</p>
  </div>
</div>
)
}
