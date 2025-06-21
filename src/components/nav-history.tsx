import { getUserChats } from "@/app/actions";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu } from "@/components/ui/sidebar";
import { ChatList } from "./ui/chat-list";

async function History() {
	const userChats = await getUserChats();
	if (!userChats?.length) {
		return <div className="flex p-2 text-sm items-center justify-center h-full">No chats yet.</div>;
	}

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
				<span>History</span>
			</SidebarGroupLabel>
			<History />
		</SidebarGroup>
	);
}
