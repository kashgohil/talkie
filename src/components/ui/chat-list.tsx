"use client";

import { deleteChat } from "@/app/actions";
import { chats } from "@/db/schema";
import { cn } from "@/lib/utils";
import { InferSelectModel } from "drizzle-orm";
import { Edit } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useOptimistic, useTransition } from "react";
import { DeleteChatButton } from "../delete-chat";
import { Button } from "./button";
import { SidebarMenuButton, SidebarMenuItem } from "./sidebar";

export function ChatList(props: { chats: InferSelectModel<typeof chats>[] }) {
	const { chats } = props;
	const params = useParams();
	const chatId = params.chatId as string;

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

	return optimisticChats.map((item) => (
		<SidebarMenuItem key={item.id}>
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
						<DeleteChatButton
							chatId={item.id}
							onDelete={removeChat}
						/>
					</div>
				</div>
			</SidebarMenuButton>
		</SidebarMenuItem>
	));
}
