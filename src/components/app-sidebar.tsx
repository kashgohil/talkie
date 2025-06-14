"use client";

import { BookOpen, Bot, Flower, Frame, LifeBuoy, Map, PieChart, Send, Settings2, SquareTerminal } from "lucide-react";
import * as React from "react";

import { NavHistory } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";

const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Playground",
			url: "#",
			icon: SquareTerminal,
			isActive: true,
		},
		{
			title: "Models",
			url: "#",
			icon: Bot,
		},
		{
			title: "Documentation",
			url: "#",
			icon: BookOpen,
		},
		{
			title: "Settings",
			url: "#",
			icon: Settings2,
		},
	],
	navSecondary: [
		{
			title: "Support",
			url: "#",
			icon: LifeBuoy,
		},
		{
			title: "Feedback",
			url: "#",
			icon: Send,
		},
	],
	projects: [
		{
			name: "Design Engineering",
			url: "#",
			icon: Frame,
		},
		{
			name: "Sales & Marketing",
			url: "#",
			icon: PieChart,
		},
		{
			name: "Travel",
			url: "#",
			icon: Map,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar
			variant="inset"
			className="border-none"
			{...props}
		>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<a
							href="#"
							className="flex items-center gap-2 p-2 text-wisteria-500"
						>
							<Flower className="!h-6 !w-6" />
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium text-xl">Wisteria</span>
							</div>
						</a>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavProjects projects={data.projects} />
				<NavHistory />
				<NavSecondary
					items={data.navSecondary}
					className="mt-auto"
				/>
				<NavUser user={data.user} />
			</SidebarContent>
		</Sidebar>
	);
}
