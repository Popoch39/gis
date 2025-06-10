"use client";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Map as MapIcon, ZoomIn, ZoomOut, RotateCcw, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MapSidebar } from "@/components/map-navbar/map-sidebar";

export default function MapSidebarComponent() {
  const handleBaseLayerChange = (layerId: string) => {
    console.log(`Fond de plan changé vers: ${layerId}`);
  };

  const handleOverlayToggle = (layerId: string, visible: boolean) => {
    console.log(`Couche overlay ${layerId} ${visible ? "activée" : "désactivée"}`);
  };

  return (
    <SidebarProvider>
      <SidebarInset>
        <div className="flex-1 relative">
          <div id="map" className="w-full h-screen bg-slate-100 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Carte OpenLayers</h3>
              <p className="text-sm">Intégrez ici votre composant de carte OpenLayers</p>
              <div className="mt-4 space-y-2 text-xs max-w-md">
                <p>
                  <strong>Fonds de plan :</strong> Un seul actif à la fois (radio buttons)
                </p>
                <p>
                  <strong>Couches overlay :</strong> Plusieurs actives possibles (checkboxes)
                </p>
              </div>
            </div>
          </div>

          {/* Contrôles flottants en haut à gauche */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-2">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Home className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Informations flottantes en haut au centre */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg px-3 py-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                OSM + 2 couches actives
              </Badge>
            </div>
          </div>

          {/* Trigger de la sidebar en haut à droite */}
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-1">
              <SidebarTrigger className="rotate-180 h-10 w-10" />
            </div>
          </div>
        </div>
      </SidebarInset>

      <MapSidebar onBaseLayerChange={handleBaseLayerChange} onOverlayToggle={handleOverlayToggle} />
    </SidebarProvider>
  );
}
