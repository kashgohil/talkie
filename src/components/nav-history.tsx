"use client";

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

export function NavHistory() {
	return (
		<SidebarGroup>
			<SidebarGroupLabel className="text-wisteria-500">History</SidebarGroupLabel>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton
						asChild
						className="group/menu-item"
					>
						<div className="w-full flex items-center justify-between relative">
							<a
								href="#"
								className="truncate"
							>
								<span>Recent Conversation from our chat history, are you okay with that?</span>
							</a>
							<div className="items-center absolute z-10 -right-full group-hover/menu-item:right-0 bg-wisteria-200 p-1 shadow-2xl transition-all duration-300 rounded-lg group-hover/menu-item:flex">
								<Button
									variant="ghost"
									size="icon"
									className="!p-1"
								>
									<Edit
										size={8}
										className="text-wisteria-500 group-hover/menu-item:text-accent-foreground"
									/>
								</Button>
								<Button
									variant="ghost"
									size="icon"
									className="!p-1"
								>
									<Trash2
										size={8}
										className="text-wisteria-500 group-hover/menu-item:text-accent-foreground"
									/>
								</Button>
							</div>
						</div>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarGroup>
	);
}
