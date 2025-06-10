import MapSidebarComponent from "@/components/map-navbar/map-sidebar-component";
import { CustomMap } from "@/components/map/CustomMap";
import { auth } from "@/lib/auth";
import LayoutSidebar from "@/providers/sidebar-provider";
import type { userType } from "@/types/user";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session === null) {
    redirect("/auth/login");
  }

  return (
    <>
      <LayoutSidebar user={session.user as userType}>
        <MapSidebarComponent />
        <div className="h-screen bg-gray-500">
          <CustomMap />
        </div>
      </LayoutSidebar>
    </>
  );
}
