import { getUserChats } from "@/app/actions";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ChatList } from "./ui/chat-list";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

async function History() {
	const userChats = await getUserChats();

	return (
		<SidebarMenu>
			<ChatList chats={userChats} />
		</SidebarMenu>
	);
}

export async function NavHistory() {
	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel className="text-wisteria-500 flex items-center gap-2 justify-between">
				<span>Open chats</span>
				<Link href="/chat">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								size="icon"
								variant="ghost"
								className="!p-1"
							>
								<Plus />
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<span>New Chat</span>
							<span className="sr-only">New Chat</span>
						</TooltipContent>
					</Tooltip>
				</Link>
			</SidebarGroupLabel>
			<History />
		</SidebarGroup>
	);
}
