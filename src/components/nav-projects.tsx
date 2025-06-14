"use client";

import { Folder, MoreHorizontal, Share, Trash2, type LucideIcon } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";

export function NavProjects({
	projects,
}: {
	projects: {
		name: string;
		url: string;
		icon: LucideIcon;
	}[];
}) {
	const { isMobile } = useSidebar();

	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel className="text-wisteria-500">Projects</SidebarGroupLabel>
			<SidebarMenu>
				{projects.map((item) => (
					<SidebarMenuItem key={item.name}>
						<SidebarMenuButton
							asChild
							className="group/menu-item"
						>
							<a href={item.url}>
								<item.icon className="text-wisteria-500 group-hover/menu-item:text-accent-foreground" />
								<span>{item.name}</span>
							</a>
						</SidebarMenuButton>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuAction showOnHover>
									<MoreHorizontal />
									<span className="sr-only">More</span>
								</SidebarMenuAction>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-48"
								side={isMobile ? "bottom" : "right"}
								align={isMobile ? "end" : "start"}
							>
								<DropdownMenuItem className="group/menu-item">
									<Folder className="text-wisteria-500 group-hover/menu-item:text-accent-foreground" />
									<span>View Project</span>
								</DropdownMenuItem>
								<DropdownMenuItem className="group/menu-item">
									<Share className="text-wisteria-500 group-hover/menu-item:text-accent-foreground" />
									<span>Share Project</span>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem className="group/menu-item">
									<Trash2 className="text-wisteria-500 group-hover/menu-item:text-accent-foreground" />
									<span>Delete Project</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
