"use client";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MapSidebar } from "@/components/map-navbar/map-sidebar";

export default function MapSidebarComponent({ children }: { children: React.ReactNode }) {
	const handleBaseLayerChange = (layerId: string) => {
		console.log(`Fond de plan changé vers: ${layerId}`);
	};

	const handleOverlayToggle = (layerId: string, visible: boolean) => {
		console.log(`Couche overlay ${layerId} ${visible ? "activée" : "désactivée"}`);
	};

	return (
		<SidebarProvider>
			<SidebarInset>
				{children}
				{/* Contrôles flottants en haut à gauche */}

				<div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
					<div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg px-3 py-2">
						<Badge variant="secondary" className="bg-primary/10 text-primary">
							OSM + 2 couches actives
						</Badge>
					</div>
				</div>

				<div className="absolute top-4 right-4 z-10">
					<div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-1">
						<SidebarTrigger className="rotate-180 h-10 w-10" />
					</div>
				</div>

				<div className="absolute top-20 right-4 flex flex-col gap-2 z-10">
					<div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-2">
						<div className="flex items-center flex-col gap-2">
							<Button variant="outline" size="sm" className="cursor-pointer">
								<Home className="h-4 w-4" />
							</Button>
							<Button variant="outline" size="sm" className="cursor-pointer">
								<ZoomIn className="h-4 w-4" />
							</Button>
							<Button variant="outline" size="sm" className="cursor-pointer">
								<ZoomOut className="h-4 w-4" />
							</Button>
							<Button variant="outline" size="sm" className="cursor-pointer">
								<RotateCcw className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>
			</SidebarInset>

			<MapSidebar onBaseLayerChange={handleBaseLayerChange} onOverlayToggle={handleOverlayToggle} />
		</SidebarProvider>
	);
}
