"use client";
import { AppSidebar } from "@/components/navbar/app-sidebar";
import { SidebarSkeleton } from "@/components/navbar/skeleton";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";

export default function LayoutSidebar({ children }: { children: React.ReactNode }) {
	const { data: session } = useSession();
	const isLoading = !session;
	console.log(isLoading);

	return (
		<SidebarProvider>
			{isLoading ? <SidebarSkeleton /> : <AppSidebar />}
			<main className="flex-1">
				<SidebarTrigger className="absolute cursor-pointer z-99999" />
				{children}
			</main>
		</SidebarProvider>
	);
}
