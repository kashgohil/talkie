import { db } from "@/db";
import { chats } from "@/db/schema";
import { eq } from "drizzle-orm";
import ChatPage from "../chatPage";

export async function generateMetadata({ params }: { params: Promise<{ chatId: string }> }) {
	const { chatId } = await params;
	const chat = await db.query.chats.findFirst({
		where: eq(chats.id, chatId),
	});

	if (!chat) {
		return {
			title: "Wisteria - AI Chat",
			description: "Chat with AI like never before",
		};
	}
	return {
		title: `${chat.name} - Wisteria`,
		description: "Chat with AI like never before",
	};
}

export default async function Home({ params }: { params: Promise<{ chatId: string }> }) {
	const { chatId } = await params;

	return <ChatPage chatId={chatId} />;
}
