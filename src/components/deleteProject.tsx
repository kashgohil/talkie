"use client";

import { deleteProject } from "@/app/actions";
import { Trash2 } from "lucide-react";
import { ConfirmationDialog } from "./confirmation-dialog";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function DeleteProjectButton({ projectId }: { projectId: string }) {
	return (
		<ConfirmationDialog
			title="Delete Project"
			description="Are you sure you want to delete this project?"
			action="Delete"
			cancel="Cancel"
			onAction={() => deleteProject(projectId)}
		>
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
		</ConfirmationDialog>
	);
}
