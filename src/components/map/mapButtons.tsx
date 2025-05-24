import useMapStore from "@/stores/mapStore";
import CustomMapLibreButton from "@/utils/CustomMapLibreButton";
import { Home } from "lucide-react";
import { useEffect } from "react";
import { FlyToParis } from "./ui/customMapButtons";

const mapButtons = () => {
	const { mapInstance } = useMapStore();
	useEffect(() => {
		if (!mapInstance) return;
		mapInstance.addControl(FlyToParis(mapInstance), "bottom-left");
	}, [mapInstance]);
	return null;
};

export default mapButtons;
