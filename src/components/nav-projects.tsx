import { Edit, Folder } from "lucide-react";

import { getUserProjects } from "@/app/actions";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AddProject } from "./add-project";
import { DeleteProjectButton } from "./deleteProject";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

async function ProjectsList() {
	const userProjects = await getUserProjects();
	if (!userProjects?.length) {
		return <div className="flex items-center justify-center h-full">No projects yet.</div>;
	}

	return (
		<SidebarMenu>
			{userProjects.map((item) => (
				<SidebarMenuItem key={item.id}>
					<SidebarMenuButton
						asChild
						className="group/menu-item"
					>
						<div className="flex items-center justify-between">
							<a href={`/project/${item.id}`}>
								<div className="flex items-center justify-between gap-2">
									<Folder
										size={16}
										className="text-wisteria-500 group-hover/menu-item:text-accent-foreground"
									/>
									<span className="truncate">{item.name}</span>
								</div>
							</a>
							<div className="items-center absolute z-10 -right-full group-hover/menu-item:right-0 bg-wisteria-200 p-1 shadow-2xl transition-all duration-300 rounded-lg group-hover/menu-item:flex">
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
								<DeleteProjectButton projectId={item.id} />
							</div>
						</div>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	);
}

export async function NavProjects() {
	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel className="text-wisteria-500 flex items-center gap-2 justify-between">
				<span>Projects</span>
				<AddProject />
			</SidebarGroupLabel>
			<ProjectsList />
		</SidebarGroup>
	);
}
