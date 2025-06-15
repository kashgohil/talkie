import { LifeBuoy, Send } from "lucide-react";
import * as React from "react";

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
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
];

export function NavSecondary({ ...props }: {} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								asChild
								className="group/nav-item"
							>
								<a href={item.url}>
									<item.icon className="text-wisteria-500 group-hover/nav-item:text-accent-foreground" />
									<span>{item.title}</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
