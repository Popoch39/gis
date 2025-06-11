"use client";

import { Eye, EyeOff, Info, Layers, Map as MapIcon, Palette, Settings, Wrench, X } from "lucide-react";
import * as React from "react";

import placeholder from "@/assets/layers/placeholder.webp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarRail, useSidebar } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

// Fonds de plan (un seul actif à la fois)
const baseLayers = [
	{
		id: "osm",
		name: "OpenStreetMap",
		description: "Carte de base standard avec rues et POI",
		thumbnail: "/placeholder.svg?height=80&width=120",
		type: "street",
	},
	{
		id: "satellite",
		name: "Vue Satellite",
		description: "Imagerie satellite haute résolution",
		thumbnail: "/placeholder.svg?height=80&width=120",
		type: "satellite",
	},
	{
		id: "terrain",
		name: "Relief",
		description: "Carte topographique avec courbes de niveau",
		thumbnail: "/placeholder.svg?height=80&width=120",
		type: "terrain",
	},
	{
		id: "dark",
		name: "Mode Sombre",
		description: "Fond de plan sombre pour la nuit",
		thumbnail: "/placeholder.svg?height=80&width=120",
		type: "dark",
	},
];

// Couches overlay (plusieurs actives possibles)
const overlayLayers = [
	{
		id: "boundaries",
		name: "Limites Administratives",
		description: "Frontières et divisions territoriales",
		thumbnail: "/placeholder.svg?height=80&width=120",
		visible: false,
		type: "administrative",
		category: "Politique",
	},
	{
		id: "population",
		name: "Densité Population",
		description: "Données démographiques par zone",
		thumbnail: "/placeholder.svg?height=80&width=120",
		visible: false,
		type: "demographic",
		category: "Social",
	},
	{
		id: "transport",
		name: "Transports Publics",
		description: "Réseau de transport en commun",
		thumbnail: "/placeholder.svg?height=80&width=120",
		visible: true,
		type: "transport",
		category: "Infrastructure",
	},
	{
		id: "weather",
		name: "Météo",
		description: "Conditions météorologiques actuelles",
		thumbnail: "/placeholder.svg?height=80&width=120",
		visible: false,
		type: "weather",
		category: "Environnement",
	},
	{
		id: "traffic",
		name: "Trafic Routier",
		description: "État du trafic en temps réel",
		thumbnail: "/placeholder.svg?height=80&width=120",
		visible: true,
		type: "traffic",
		category: "Transport",
	},
];

interface MapSidebarProps extends React.ComponentProps<typeof Sidebar> {
	onBaseLayerChange?: (layerId: string) => void;
	onOverlayToggle?: (layerId: string, visible: boolean) => void;
}

export function MapSidebar({ onBaseLayerChange, onOverlayToggle, ...props }: MapSidebarProps) {
	const [activeBaseLayer, setActiveBaseLayer] = React.useState("osm");
	const [overlays, setOverlays] = React.useState(overlayLayers);
	const [activeTab, setActiveTab] = React.useState("base");
	const { toggleSidebar } = useSidebar();

	const handleBaseLayerChange = (layerId: string) => {
		setActiveBaseLayer(layerId);
		if (onBaseLayerChange) {
			onBaseLayerChange(layerId);
		}
	};

	const toggleOverlay = (layerId: string) => {
		setOverlays((prev) => prev.map((layer) => (layer.id === layerId ? { ...layer, visible: !layer.visible } : layer)));

		const layer = overlays.find((l) => l.id === layerId);
		if (layer && onOverlayToggle) {
			onOverlayToggle(layerId, !layer.visible);
		}
	};

	const getTypeStyle = (type: string) => {
		const styles = {
			street: "bg-gradient-to-r from-slate-500 to-gray-600 text-white shadow-lg",
			satellite: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg",
			terrain: "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg",
			dark: "bg-gradient-to-r from-gray-800 to-black text-white shadow-lg",
			administrative: "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg",
			demographic: "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg",
			transport: "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg",
			weather: "bg-gradient-to-r from-sky-500 to-blue-400 text-white shadow-lg",
			traffic: "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg",
		};
		return styles[type as keyof typeof styles] || "bg-gradient-to-r from-gray-500 to-slate-500 text-white";
	};

	const getCategoryStyle = (category: string) => {
		const styles = {
			Politique: "bg-purple-100 text-purple-800 border border-purple-300",
			Social: "bg-pink-100 text-pink-800 border border-pink-300",
			Infrastructure: "bg-blue-100 text-blue-800 border border-blue-300",
			Environnement: "bg-green-100 text-green-800 border border-green-300",
			Transport: "bg-orange-100 text-orange-800 border border-orange-300",
		};
		return styles[category as keyof typeof styles] || "bg-gray-100 text-gray-800";
	};

	const BaseLayersContent = () => (
		<SidebarGroup>
			<SidebarGroupLabel>Fonds de Plan</SidebarGroupLabel>
			<SidebarGroupContent>
				<RadioGroup value={activeBaseLayer} onValueChange={handleBaseLayerChange} className="space-y-3">
					{baseLayers.map((layer) => (
						<div key={layer.id}>
							<Label htmlFor={layer.id} className="cursor-pointer">
								<Card
									className={`transition-all duration-200 hover:shadow-lg hover:scale-[1.01] overflow-hidden
              ${activeBaseLayer === layer.id ? "ring-2 ring-primary ring-opacity-50 shadow-md" : ""}`}
								>
									<CardContent className="p-3 overflow-hidden">
										<div className="flex gap-3 min-w-0">
											<div className="relative flex-shrink-0">
												<Image src={placeholder} className="w-14 h-10 object-cover rounded-lg border-2 border-white shadow-sm" alt="placeholder" />
												{activeBaseLayer === layer.id && (
													<div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-2 border-white shadow-lg" />
												)}
											</div>

											<div className="flex-1 min-w-0 overflow-hidden">
												<div className="flex items-start justify-between gap-2 min-w-0">
													<div className="flex-1 min-w-0 overflow-hidden">
														<h4 className="font-semibold text-sm truncate text-foreground">{layer.name}</h4>
														<p className="text-xs text-muted-foreground line-clamp-2 mt-1 break-words">{layer.description}</p>
													</div>

													<RadioGroupItem value={layer.id} id={layer.id} className="flex-shrink-0 mt-1" />
												</div>

												<div className="flex items-center justify-between mt-3 gap-1 min-w-0">
													<Badge className={`text-xs font-medium px-2 py-1 ${getTypeStyle(layer.type)}`}>{layer.type}</Badge>

													<Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-primary/10 flex-shrink-0">
														<Settings className="h-3 w-3 text-muted-foreground" />
													</Button>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</Label>
						</div>
					))}
				</RadioGroup>
			</SidebarGroupContent>
		</SidebarGroup>
	);

	const OverlayLayersContent = () => (
		<SidebarGroup>
			<SidebarGroupLabel>Couches Overlay</SidebarGroupLabel>
			<SidebarGroupContent>
				<div className="space-y-3">
					{overlays.map((layer) => (
						<Card
							key={layer.id}
							className={`transition-all duration-200 hover:shadow-lg hover:scale-[1.01] overflow-hidden
          ${layer.visible ? "ring-2 ring-primary ring-opacity-50 shadow-md" : ""}`}
						>
							<CardContent className="p-3 overflow-hidden">
								<div className="flex gap-3 min-w-0">
									<div className="relative flex-shrink-0">
										<Image src={placeholder} alt="placeholder" className="w-14 h-10 object-cover rounded-lg border-2 border-white shadow-sm" />
										{layer.visible && (
											<div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-2 border-white shadow-lg" />
										)}
									</div>

									<div className="flex-1 min-w-0 overflow-hidden">
										<div className="flex items-start justify-between gap-2 min-w-0">
											<div className="flex-1 min-w-0 overflow-hidden">
												<h4 className="font-semibold text-sm truncate text-foreground">{layer.name}</h4>
												<p className="text-xs text-muted-foreground line-clamp-2 mt-1 break-words">{layer.description}</p>
											</div>

											<Button variant="ghost" size="sm" className="h-8 w-8 p-0 flex-shrink-0 hover:bg-primary/10" onClick={() => toggleOverlay(layer.id)}>
												{layer.visible ? <Eye className="h-4 w-4 text-green-600" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
											</Button>
										</div>

										<div className="flex items-center justify-between mt-3 gap-1 min-w-0">
											<div className="flex gap-1 min-w-0 flex-1 overflow-hidden">
												<Badge className={`text-xs font-medium px-2 py-1 ${getTypeStyle(layer.type)}`}>{layer.type}</Badge>
												<Badge variant="outline" className={`text-xs px-2 py-1 ${getCategoryStyle(layer.category)}`}>
													{layer.category}
												</Badge>
											</div>

											<Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-primary/10 flex-shrink-0">
												<Settings className="h-3 w-3 text-muted-foreground" />
											</Button>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</SidebarGroupContent>
		</SidebarGroup>
	);

	const LegendContent = () => (
		<SidebarGroup>
			<SidebarGroupLabel>Légende</SidebarGroupLabel>
			<SidebarGroupContent>
				<div className="space-y-4">
					<Card>
						<CardContent className="p-4">
							<h4 className="font-medium mb-3">Symboles de la carte</h4>
							<div className="space-y-2">
								<div className="flex items-center gap-3">
									<div className="w-4 h-4 bg-blue-500 rounded-full" />
									<span className="text-sm">Points d&apos;eau</span>
								</div>
								<div className="flex items-center gap-3">
									<div className="w-4 h-4 bg-green-500 rounded-full" />
									<span className="text-sm">Espaces verts</span>
								</div>
								<div className="flex items-center gap-3">
									<div className="w-4 h-4 bg-red-500 rounded-full" />
									<span className="text-sm">Zones urbaines</span>
								</div>
								<div className="flex items-center gap-3">
									<div className="w-4 h-4 bg-yellow-500 rounded-full" />
									<span className="text-sm">Zones industrielles</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-4">
							<h4 className="font-medium mb-3">Échelle de couleurs</h4>
							<div className="space-y-2">
								<div className="h-4 bg-gradient-to-r from-blue-200 via-green-300 to-red-400 rounded" />
								<div className="flex justify-between text-xs text-muted-foreground">
									<span>Faible</span>
									<span>Moyen</span>
									<span>Élevé</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</SidebarGroupContent>
		</SidebarGroup>
	);

	const ToolsContent = () => (
		<SidebarGroup>
			<SidebarGroupLabel>Outils</SidebarGroupLabel>
			<SidebarGroupContent>
				<div className="space-y-3">
					<Card className="hover:shadow-md transition-shadow overflow-hidden">
						<CardContent className="p-3 overflow-hidden">
							<div className="flex items-center gap-3 min-w-0">
								<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
									<Palette className="w-4 h-4 text-white" />
								</div>
								<div className="min-w-0 flex-1 overflow-hidden">
									<h4 className="font-medium text-sm truncate">Style de carte</h4>
									<p className="text-xs text-muted-foreground truncate">Personnaliser l&apos;apparence</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="hover:shadow-md transition-shadow overflow-hidden">
						<CardContent className="p-3 overflow-hidden">
							<div className="flex items-center gap-3 min-w-0">
								<div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
									<Wrench className="w-4 h-4 text-white" />
								</div>
								<div className="min-w-0 flex-1 overflow-hidden">
									<h4 className="font-medium text-sm truncate">Mesures</h4>
									<p className="text-xs text-muted-foreground truncate">Distance et surface</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="hover:shadow-md transition-shadow overflow-hidden">
						<CardContent className="p-3 overflow-hidden">
							<div className="flex items-center gap-3 min-w-0">
								<div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center flex-shrink-0">
									<Info className="w-4 h-4 text-white" />
								</div>
								<div className="min-w-0 flex-1 overflow-hidden">
									<h4 className="font-medium text-sm truncate">Informations</h4>
									<p className="text-xs text-muted-foreground truncate">Détails sur les éléments</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</SidebarGroupContent>
		</SidebarGroup>
	);

	const activeOverlaysCount = overlays.filter((layer) => layer.visible).length;

	return (
		<Sidebar side="right" className="overflow-x-hidden" {...props}>
			<SidebarHeader className="border-b border-sidebar-border overflow-hidden">
				<div className="flex items-center justify-between p-2">
					<h2 className="text-lg font-semibold">Couches de Carte</h2>
					<Button variant="ghost" size="sm" onClick={toggleSidebar} className="h-8 w-8 p-0">
						<X className="h-4 w-4" />
					</Button>
				</div>
				<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
					<TabsList className="grid w-full grid-cols-4 bg-muted/50 h-9">
						<TabsTrigger value="base" className="flex items-center gap-1 text-xs px-1 min-w-0">
							<MapIcon className="w-3 h-3 flex-shrink-0" />
							<span className="truncate">Fonds</span>
						</TabsTrigger>
						<TabsTrigger value="overlay" className="flex items-center gap-1 text-xs px-1 min-w-0">
							<Layers className="w-3 h-3 flex-shrink-0" />
							<span className="truncate">Couches</span>
							{activeOverlaysCount > 0 && (
								<span className="bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">{activeOverlaysCount}</span>
							)}
						</TabsTrigger>
						<TabsTrigger value="legend" className="flex items-center gap-1 text-xs px-1 min-w-0">
							<Palette className="w-3 h-3 flex-shrink-0" />
							<span className="truncate">Légende</span>
						</TabsTrigger>
						<TabsTrigger value="tools" className="flex items-center gap-1 text-xs px-1 min-w-0">
							<Wrench className="w-3 h-3 flex-shrink-0" />
							<span className="truncate">Outils</span>
						</TabsTrigger>
					</TabsList>
				</Tabs>
			</SidebarHeader>

			<SidebarContent>
				<Tabs value={activeTab} className="w-full">
					<TabsContent value="base" className="mt-0">
						<BaseLayersContent />
					</TabsContent>
					<TabsContent value="overlay" className="mt-0">
						<OverlayLayersContent />
					</TabsContent>
					<TabsContent value="legend" className="mt-0">
						<LegendContent />
					</TabsContent>
					<TabsContent value="tools" className="mt-0">
						<ToolsContent />
					</TabsContent>
				</Tabs>
			</SidebarContent>

			<SidebarRail />
		</Sidebar>
	);
}
