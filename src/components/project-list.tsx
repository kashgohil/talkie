"use client";

import { deleteProject } from "@/app/actions";
import { projects } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { Edit, Folder } from "lucide-react";
import { useCallback, useOptimistic, useTransition } from "react";
import { DeleteProjectButton } from "./delete-project";
import { Button } from "./ui/button";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

export function ProjectList(props: { projects: InferSelectModel<typeof projects>[] }) {
	const { projects } = props;

	const [, startTransition] = useTransition();

	const [optimisticProjects, deleteProjectAction] = useOptimistic(
		projects,
		(state, { projectId }: { projectId: string }) => {
			return state.filter((project) => project.id !== projectId);
		}
	);

	const removeProject = useCallback(
		(projectId: string) => {
			startTransition(() => {
				deleteProjectAction({ projectId });
				deleteProject(projectId);
			});
		},
		[deleteProjectAction]
	);

	return optimisticProjects.map((item) => (
		<SidebarMenuItem key={item.id}>
			<SidebarMenuButton
				asChild
				className="group/menu-item overflow-y-visible"
			>
				<div className="w-full flex items-center justify-between relative">
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

						<DeleteProjectButton
							projectId={item.id}
							onDelete={removeProject}
						/>
					</div>
				</div>
			</SidebarMenuButton>
		</SidebarMenuItem>
	));
}
