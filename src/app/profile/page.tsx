import SignOutButton from "@/components/auth/sign-out-button";
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function ProfilePage() {

  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p>You are not logged in</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <pre className="overflow-x-auto">
        {JSON.stringify(session, null, 2)}
      </pre>
      <SignOutButton />
    </div>
  )
}
