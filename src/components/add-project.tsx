"use client";

import { addProject } from "@/app/actions";
import { projects } from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";
import { Plus } from "lucide-react";
import React, { useActionState } from "react";

import { Button } from "./ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "./ui/sonner";
import { Textarea } from "./ui/textarea";

type Project = InferInsertModel<typeof projects>;
type State = {
	error: string | { name?: string[]; description?: string[]; systemPrompt?: string[] } | null;
	success: string | null;
	project: Project | null;
	input: { name: string; description: string; systemPrompt: string } | undefined;
};

export function AddProject() {
	const [state, formAction, isPending] = useActionState<State, FormData>(addProject, {
		error: null,
		success: null,
		project: null,
		input: undefined,
	});

	const [isOpen, setIsOpen] = React.useState(false);

	React.useEffect(() => {
		if (state.success) {
			toast({
				title: "Project created successfully",
				description: "You can now start chatting with your project.",
				button: {
					label: "Close",
					onClick: () => setIsOpen(false),
				},
				type: "success",
			});
			setIsOpen(false);
		}
		if (state.error) {
			toast({
				title: "Failed to create project",
				description: "Please try again.",
				button: {
					label: "Close",
					onClick: () => setIsOpen(false),
				},
				type: "error",
			});
		}
	}, [state.success, state.error]);

	return (
		<>
			<Dialog
				open={isOpen}
				onOpenChange={setIsOpen}
			>
				<DialogTrigger asChild>
					<Button
						size="icon"
						variant="ghost"
						className="!p-0.5"
					>
						<Plus />
					</Button>
				</DialogTrigger>
				<DialogContent>
					<form
						action={formAction}
						className="flex flex-col gap-4"
					>
						<DialogHeader>
							<DialogTitle>Add Project</DialogTitle>
							<DialogDescription>Add a new project to your workspace</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4">
							<div className="grid gap-3">
								<Label htmlFor="name-1">Name</Label>
								<Input
									id="name-1"
									name="name"
									placeholder="Project Name"
									required
									defaultValue={state.input?.name}
								/>
							</div>
							<div className="grid gap-3">
								<Label htmlFor="description-1">Description</Label>
								<Input
									id="description-1"
									name="description"
									placeholder="This is a description of the project."
									required
									defaultValue={state.input?.description}
								/>
							</div>
							<div className="grid gap-3">
								<Label htmlFor="system-prompt-1">System Prompt</Label>
								<Textarea
									id="system-prompt-1"
									name="system-prompt"
									placeholder="You are a helpful assistant."
									className="!min-h-[100px]"
									required
									defaultValue={state.input?.systemPrompt}
								/>
							</div>
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button
									type="button"
									interactive
								>
									Cancel
								</Button>
							</DialogClose>
							<Button
								interactive
								type="submit"
								variant="default"
								disabled={isPending}
								className="bg-wisteria-500 hover:bg-wisteria-600 text-accent-foreground"
							>
								Create Project
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
}
