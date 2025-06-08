"use client";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

type itemType = {
	title: string;
	url?: string;
	onClick?: () => void;
	icon?: LucideIcon;
};

export function NavMain({
	items,
}: {
	items: {
		title: string;
		icon?: LucideIcon;
		isActive?: boolean;
		items?: itemType[];
	}[];
}) {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Platform</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton tooltip={item.title}>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
									<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
								</SidebarMenuButton>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<SidebarMenuSub>
									{item.items?.map((subItem) => (
										<SidebarMenuSubItem key={subItem.title}>
											<SidebarMenuSubButton asChild className="cursor-pointer" onMouseDown={subItem.onClick ? subItem.onClick : () => {}}>
												<div className="flex flex-row w-full">
													{subItem.icon && <subItem.icon />}
													{subItem.onClick ? (
														<div onMouseDown={subItem.onClick}>
															<span>{subItem.title}</span>
														</div>
													) : (
														<Link href={subItem.url || ""}>
															<span>{subItem.title}</span>
														</Link>
													)}
												</div>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									))}
								</SidebarMenuSub>
							</CollapsibleContent>
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
