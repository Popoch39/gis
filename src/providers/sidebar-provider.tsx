import { AppSidebar } from "@/components/navbar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { UserInterface } from "@/types/user";

export default function LayoutSidebar({ user, children }: { user: UserInterface; children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar user={user} />
			<main className="flex-1">
				<SidebarTrigger className="absolute cursor-pointer z-99999" />
				{children}
			</main>
		</SidebarProvider>
	);
}
