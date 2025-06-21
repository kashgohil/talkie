"use client";

import { deleteProject } from "@/app/actions";
import { projects } from "@/db/schema";
import { cn } from "@/lib/utils";
import { InferSelectModel } from "drizzle-orm";
import { Edit, Folder } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useOptimistic, useTransition } from "react";
import { DeleteProjectButton } from "./delete-project";
import { Button } from "./ui/button";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

export function ProjectList(props: { projects: InferSelectModel<typeof projects>[] }) {
	const { projects } = props;
	const params = useParams();
	const projectId = params.projectId as string;

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
				className={cn(
					"group/menu-item [&_svg]:text-accent hover:[&_svg]:text-accent-foreground",
					projectId === item.id && "bg-accent/20"
				)}
			>
				<div className="w-full flex items-center justify-between relative">
					<Link
						href={`/project/${item.id}`}
						className="w-full"
					>
						<div className="flex items-center justify-between gap-2">
							<Folder
								size={16}
								className="flex-shrink-0"
							/>
							<span className="flex-1 truncate">{item.name}</span>
						</div>
					</Link>
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
