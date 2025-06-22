"use client";

import { deleteChat, getUserProjects } from "@/app/actions";
import { chats } from "@/db/schema";
import { cn } from "@/lib/utils";
import { dehydrate, HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InferSelectModel } from "drizzle-orm";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Fragment, useCallback, useEffect, useOptimistic, useState, useTransition } from "react";
import { ConfirmationDialog } from "../confirmation-dialog";
import { MoveChat } from "../move-chat";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { SidebarMenuButton, SidebarMenuItem } from "./sidebar";

export function ChatList(props: { chats: InferSelectModel<typeof chats>[] }) {
	const { chats } = props;
	const searchParams = useSearchParams();
	const chatId = searchParams.get("id");

	const [queryClient] = useState(() => new QueryClient());

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

	useEffect(() => {
		queryClient.prefetchQuery({
			queryKey: ["projects"],
			queryFn: getUserProjects,
		});
	}, [queryClient]);

	if (!optimisticChats?.length) {
		return <div className="flex p-2 text-sm items-center justify-center h-full">No open chats yet.</div>;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<HydrationBoundary state={dehydrate(queryClient)}>
				{optimisticChats.map((item) => (
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
												className="!p-1 group-hover/menu-item:visible invisible"
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
											<MoveChat chatId={item.id} />
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
				))}
			</HydrationBoundary>
		</QueryClientProvider>
	);
}
