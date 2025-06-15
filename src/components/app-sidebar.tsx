import { Flower } from "lucide-react";
import * as React from "react";

import { NavHistory } from "@/components/nav-history";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
				<NavProjects />
				<NavHistory />
				<NavSecondary className="mt-auto" />
				<NavUser />
			</SidebarContent>
		</Sidebar>
	);
}
