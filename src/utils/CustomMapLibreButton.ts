import type { LucideIcon } from "lucide-react";
import type { IControl, Map as MaplibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { createElement } from "react";
import { createRoot } from "react-dom/client";

class CustomMapLibreButton implements IControl {
	private _map: MaplibreMap | undefined;
	private _container: HTMLDivElement | undefined;
	private _button: HTMLButtonElement | undefined;
	private _tooltip: HTMLDivElement | undefined;
	private _onClick: () => void;
	private _title: string;
	private _className: string;
	private _icon?: LucideIcon;
	private _iconOnly: boolean;
	private _tooltipPosition: "top" | "bottom" | "left" | "right" = "top";

	constructor(
		onClick: () => void,
		title: string,
		options?: {
			className?: string;
			icon?: LucideIcon;
			iconOnly?: boolean;
			tooltipPosition?: "top" | "bottom" | "left" | "right";
		},
	) {
		this._onClick = onClick;
		this._title = title;
		this._className = options?.className || "maplibregl-ctrl-icon";
		this._icon = options?.icon;
		this._iconOnly = options?.iconOnly || false;
		this._tooltipPosition = options?.tooltipPosition || "top";
	}

	onAdd(map: MaplibreMap): HTMLElement {
		this._map = map;
		this._container = document.createElement("div");
		this._container.className = "maplibregl-ctrl maplibregl-ctrl-group";

		this._button = document.createElement("button");
		this._button.className = this._className;
		this._button.type = "button";
		this._button.title = this._title;

		this._button.style.cssText = `
			background: white;
      display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			border: none;
			padding: 8px 12px;
			cursor: pointer;
			font-size: 12px;
			font-weight: 500;
			color: #333;
			border-radius: 2px;
			display: flex;
			align-items: center;
			gap: 6px;
			min-width: ${this._iconOnly ? "32px" : "auto"};
			justify-content: center;
      position: relative;
		`;

		this._tooltip = document.createElement("div");
		this._tooltip.textContent = this._title;

		this._tooltip.style.cssText = `
			position: absolute;
			background: hsl(0 0% 3.9%);
			color: hsl(0 0% 98%);
			padding: 6px 12px;
			border-radius: 6px;
			font-size: 12px;
			font-weight: 500;
			white-space: nowrap;
			pointer-events: none;
			opacity: 0;
			visibility: hidden;
			transition: all 0.15s ease;
			z-index: 99999;
			box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
			border: 1px solid hsl(0 0% 14.9%);
		`;

		this._tooltip.style.cssText += this.getTooltipPosition(this._tooltipPosition);

		if (this._icon) {
			// Créer un conteneur pour l'icône React
			const iconContainer = document.createElement("span");
			iconContainer.style.cssText =
				"display: flex; align-items: center; justify-content: center; flex-direction: column";

			const iconElement = createElement(this._icon, {
				size: 16,
				strokeWidth: 2,
			});

			const root = createRoot(iconContainer);
			root.render(iconElement);

			this._button.appendChild(iconContainer);

			if (!this._iconOnly) {
				const textSpan = document.createElement("span");
				textSpan.textContent = this._title;
				this._button.appendChild(textSpan);
			}
		} else {
			this._button.textContent = this._title;
		}

		this._button.addEventListener("click", this._onClick);
		this._button.addEventListener("mouseenter", () => {
			console.log("enter", this._tooltip);
			if (this._tooltip) {
				this._tooltip.style.opacity = "1";
				this._tooltip.style.visibility = "visible";
			}
		});
		this._button.addEventListener("mouseleave", () => {
			if (this._tooltip) {
				this._tooltip.style.opacity = "0";
				this._tooltip.style.visibility = "hidden";
			}
		});

		this._container.appendChild(this._button);
		this._container.appendChild(this._tooltip);
		return this._container;
	}

	onRemove(): void {
		if (this._container && this._container?.parentNode) {
			this._container.parentNode.removeChild(this._container);
		}
		this._map = undefined;
	}

	getTooltipPosition(tooltipPosition: "top" | "bottom" | "left" | "right") {
		console.log(tooltipPosition);
		switch (tooltipPosition) {
			case "top":
				return "top: 100%; transform: translateX(-50%);";
			case "bottom":
				return "bottom: 100%; transform: translateX(-50%);";
			case "left":
				return "top: 0; right: 3rem";
			case "right":
				return "top: 0; left: 3rem";
			default:
				return "top: 100%; transform: translateX(-50%);";
		}
	}
}

export default CustomMapLibreButton;
