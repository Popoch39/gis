import type { Map as MaplibreMap } from "maplibre-gl";
import { create } from "zustand";

interface MapStore {
	mapInstance: MaplibreMap | null;
	setMap: (map: maplibregl.Map) => void;
}

const useMapStore = create<MapStore>()((set) => ({
	mapInstance: null,
	setMap: (map) => set({ mapInstance: map }),
}));

export default useMapStore;
