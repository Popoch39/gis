import CustomMapLibreButton from "@/utils/CustomMapLibreButton";
import { Home } from "lucide-react";

export const FlyToParis = (map: maplibregl.Map) => {
	const handleClick = () => {
		map.flyTo({
			center: [2.3522, 48.8566],
			zoom: 12,
			duration: 1000,
			essential: true,
		});
	};

	const text = "Fly to Paris";
	const icon = Home;
	const className = "maplibregl-ctrl-icon";
	const iconOnly = true;
	const tooltipPosition = "right";

	const button = new CustomMapLibreButton(handleClick, text, {
		className,
		icon,
		iconOnly,
		tooltipPosition,
	});
	return button;
};
