"use client";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { AudioWaveform, Command, GalleryVerticalEnd, Layers, Plus, AlertCircle } from "lucide-react";
import type * as React from "react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import { useModalStore } from "@/stores/ModalStore";
import CreateLayerModal from "../ui/modals/create-layer-modal";
import { useQuery } from "@tanstack/react-query";
import { LayerClientService } from "@/client/endpoints/layer";
import { Skeleton } from "../ui/skeleton";
import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const openDialogFn = useModalStore((state) => state.openDialog);

	const {
		data: layers = [],
		isLoading,
		isError,
		refetch,
		isFetching,
	} = useQuery({
		queryKey: ["layers"],
		queryFn: async () => {
			const layers = await LayerClientService.getAllByUserId();
			return layers;
		},
		staleTime: 5 * 60 * 1000,
		retry: 3,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
	});

	const staticItems = {
		teams: [
			{
				name: "Acme Inc",
				logo: GalleryVerticalEnd,
				plan: "Enterprise",
			},
			{
				name: "Acme Corp.",
				logo: AudioWaveform,
				plan: "Startup",
			},
			{
				name: "Evil Corp.",
				logo: Command,
				plan: "Free",
			},
		],
	};

	const createNavItems = () => {
		const layerItems = layers.map((layer) => ({
			title: layer.name,
			onClick: () => {
				console.log(`Clicked on layer: ${layer.name}`);
				// TODO: Implement navigation to layer details
			},
			icon: Layers,
		}));

		const createLayerItem = {
			title: "Créer une couche",
			onClick: () => {
				openDialogFn(<CreateLayerModal />);
			},
			icon: Plus,
		};

		return [
			{
				title: "Mes couches",
				icon: Layers,
				isActive: true,
				items: [...layerItems, createLayerItem],
			},
		];
	};

	const LayersLoadingSkeleton = () => (
		<div className="space-y-2 p-2">
			<Skeleton className="h-4 w-full" />
			<Skeleton className="h-4 w-3/4" />
			<Skeleton className="h-4 w-1/2" />
		</div>
	);

	const LayersError = () => (
		<Alert className="m-2">
			<AlertCircle className="h-4 w-4" />
			<AlertDescription className="flex items-center justify-between">
				<span>Erreur lors du chargement des couches</span>
				<Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
					{isFetching ? "Chargement..." : "Réessayer"}
				</Button>
			</AlertDescription>
		</Alert>
	);

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={staticItems.teams} />
			</SidebarHeader>
			<SidebarContent>{isLoading ? <LayersLoadingSkeleton /> : isError ? <LayersError /> : <NavMain items={createNavItems()} />}</SidebarContent>
			<SidebarFooter>
				<div className="flex items-center justify-between py-2">
					<NavUser />
				</div>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
