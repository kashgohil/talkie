import { getProjectChats, getUserProject } from "@/app/actions";
import ChatPage from "@/app/chat/chatPage";
import { MessageSquare } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
	const { projectId } = await params;
	const userProject = await getUserProject(projectId);
	const chats = await getProjectChats(projectId);

	console.log(chats);

	if (!userProject) {
		return notFound();
	}

	return (
		<div className="flex flex-col gap-4 h-full">
			<div className="flex items-center justify-center gap-2 ">
				<h1 className="text-4xl text-center text-accent">{userProject.name}</h1>
			</div>
			<div className="flex items-center justify-center gap-2 flex-1 overflow-hidden">
				<div className="flex flex-col gap-2 w-3/4 relative h-full">
					<ChatPage />
				</div>
				<div className="flex flex-col gap-2 w-1/4">
					{chats.map((chat) => (
						<div
							key={chat.id}
							className="flex items-center justify-center gap-2 bg-accent/20 p-2 rounded-lg cursor-pointer"
						>
							<div className="flex items-center justify-center gap-2">
								<MessageSquare className="w-4 h-4 text-accent" />
								<span className="text-accent">{chat.name}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
