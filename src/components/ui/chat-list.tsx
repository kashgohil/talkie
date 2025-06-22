"use client";

import { deleteChat } from "@/app/actions";
import { chats } from "@/db/schema";
import { cn } from "@/lib/utils";
import { InferSelectModel } from "drizzle-orm";
import { Edit, Folder, MoreVertical, Trash2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Fragment, useCallback, useOptimistic, useState, useTransition } from "react";
import { ConfirmationDialog } from "../confirmation-dialog";
import { Button } from "./button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "./dropdown-menu";
import { SidebarMenuButton, SidebarMenuItem } from "./sidebar";

export function ChatList(props: { chats: InferSelectModel<typeof chats>[] }) {
	const { chats } = props;
	const searchParams = useSearchParams();
	const chatId = searchParams.get("id");

	const [isOpen, setIsOpen] = useState(false);
	const [, startTransition] = useTransition();

	const [optimisticChats, deleteChatAction] = useOptimistic(chats, (state, { chatId }: { chatId: string }) => {
		return state.filter((chat) => chat.id !== chatId);
	});

	const removeChat = useCallback(
		(chatId: string) => {
			startTransition(() => {
				deleteChatAction({ chatId });
				deleteChat(chatId);
			});
		},
		[deleteChatAction]
	);

	if (!optimisticChats?.length) {
		return <div className="flex p-2 text-sm items-center justify-center h-full">No chats yet.</div>;
	}

	return optimisticChats.map((item) => (
		<Fragment key={item.id}>
			<SidebarMenuItem>
				<SidebarMenuButton
					asChild
					className={cn(
						"group/menu-item [&_svg]:text-accent hover:[&_svg]:text-accent-foreground",
						chatId === item.id && "bg-accent/20"
					)}
				>
					<div className="w-full flex items-center justify-between relative">
						<Link
							href={`/chat/${item.id}`}
							className="w-full"
						>
							<div className="flex items-center justify-between gap-2">
								<span className="truncate">{item.name}</span>
							</div>
						</Link>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="!p-1"
								>
									<MoreVertical
										size={8}
										className="text-wisteria-500 group-hover/menu-item:text-accent-foreground"
									/>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="right"
								align="start"
								className="w-40"
							>
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
										<DropdownMenuItem>
											<span>Edit</span>
										</DropdownMenuItem>
									</DropdownMenuSubContent>
								</DropdownMenuSub>
								<DropdownMenuItem className="group/item">
									<Edit
										size={8}
										className="text-wisteria-600 group-hover/item:text-accent-foreground group-focus/item:text-accent-foreground"
									/>
									<span>Edit</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									className="group/item"
									onClick={() => {
										setIsOpen(true);
									}}
								>
									<Trash2
										size={8}
										className="text-wisteria-600 group-hover/item:text-accent-foreground group-focus/item:text-accent-foreground"
									/>
									<span>Delete</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</SidebarMenuButton>
			</SidebarMenuItem>

			<ConfirmationDialog
				open={isOpen}
				onOpenChange={setIsOpen}
				title="Delete chat"
				description="Are you sure you want to delete this chat?"
				action="Delete"
				cancel="Cancel"
				onAction={() => removeChat(item.id)}
			/>
		</Fragment>
	));
}
