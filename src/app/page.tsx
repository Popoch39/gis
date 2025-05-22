import { SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import LayoutSidebar from "@/providers/sidebar-provider";
import { UserInterface } from "@/types/user";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (session === null) {
    redirect("/auth/login");
  }

  return (
    <LayoutSidebar user={session.user as UserInterface}>
      <div className="h-screen bg-gray-500">test</div>
    </LayoutSidebar>
  );
}
