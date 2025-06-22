import { getUserProjects, moveChat } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";
import { Folder, Loader2 } from "lucide-react";
import { DropdownMenuItem, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "./ui/dropdown-menu";

export function MoveChat({ chatId }: { chatId: string }) {
	const { data: projects, isLoading } = useQuery({
		queryKey: ["projects"],
		queryFn: getUserProjects,
	});

	return (
		<DropdownMenuSub>
			<DropdownMenuSubTrigger className="group/item">
				<div className="flex items-center gap-2 cursor-pointer hover:text-accent-foreground">
					<Folder
						size={16}
						className="text-wisteria-600 group-hover/item:text-accent-foreground group-focus/item:text-accent-foreground"
					/>
					<span>Move to</span>
				</div>
			</DropdownMenuSubTrigger>
			<DropdownMenuSubContent>
				{isLoading ? (
					<div className="flex items-center justify-center h-full">
						<Loader2 className="animate-spin" />
					</div>
				) : (
					projects?.map((project) => (
						<DropdownMenuItem
							key={project.id}
							onClick={() => {
								moveChat(chatId, project.id);
							}}
						>
							<span>{project.name}</span>
						</DropdownMenuItem>
					))
				)}
			</DropdownMenuSubContent>
		</DropdownMenuSub>
	);
}
