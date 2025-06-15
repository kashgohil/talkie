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
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

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
						<div className="flex items-center justify-between">
							<a
								href="#"
								className="truncate"
							>
								<span>Recent Conversation from our chat history, are you okay with that?</span>
							</a>
							<div className="items-center absolute z-10 -right-full group-hover/menu-item:right-0 bg-wisteria-200 p-1 shadow-2xl transition-all duration-300 rounded-lg group-hover/menu-item:flex delay-300">
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											variant="ghost"
											size="icon"
										>
											<Edit
												size={12}
												className="text-wisteria-500 group-hover/menu-item:text-accent-foreground"
											/>
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<span>Edit</span>
										<span className="sr-only">Edit</span>
									</TooltipContent>
								</Tooltip>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											variant="ghost"
											size="icon"
										>
											<Trash2
												size={12}
												className="text-wisteria-500 group-hover/menu-item:text-accent-foreground"
											/>
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<span>Delete</span>
										<span className="sr-only">Delete</span>
									</TooltipContent>
								</Tooltip>
							</div>
						</div>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarGroup>
	);
}
