import { db } from "@/db";
import { chats as chatsTable, messages as messagesTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText, streamText } from "ai";
import { revalidatePath } from "next/cache";

const openRouter = createOpenRouter({
	apiKey: process.env.OPENROUTER_API_KEY!,
});

// Helper function to revalidate chat-related paths
function revalidateChatPaths() {
	revalidatePath("/");
	revalidatePath("/chat");
}

export async function POST(req: Request) {
	try {
		const { messages, model, chatId: chatIdParam, projectId } = await req.json();

		if (!messages || !model) {
			return new Response(JSON.stringify({ error: "Messages and model are required" }), { status: 400 });
		}

		const { userId } = await auth();

		if (!userId) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
		}

		console.log("Processing chat request:", { model, messageCount: messages.length, userId });

		let chatId = chatIdParam;

		if (!chatId) {
			const model = openRouter("meta-llama/llama-3.3-8b-instruct:free");
			const result = await generateText({
				model,
				prompt: `Generate a name for the chat based on the following message: ${messages[0].content}. The name should be a single word or phrase that captures the essence of the chat. Only return the name, no other text. provide proper spacing.`,
			});

			const newChat = await db
				.insert(chatsTable)
				.values({
					id: crypto.randomUUID(),
					userId,
					projectId,
					name: result.text,
				})
				.returning({ id: chatsTable.id });

			chatId = newChat[0].id;
			console.log("New chat created:", newChat);
			revalidateChatPaths();
		}

		db.insert(messagesTable)
			.values({
				chatId,
				userId,
				id: crypto.randomUUID(),
				role: "user",
				message: messages[0].content,
				model,
			})
			.then(() => {
				revalidateChatPaths();
			});

		const chatModel = openRouter(model);

		const result = streamText({
			messages,
			model: chatModel,
			onFinish: async (message) => {
				await db.insert(messagesTable).values({
					chatId,
					userId,
					id: crypto.randomUUID(),
					role: "assistant",
					message: message.text,
					model: model,
					response: message.text,
					responseTokens: message.usage?.completionTokens,
					responseTime: Date.now() - message.response.timestamp.getTime(),
				});

				revalidateChatPaths();
			},
		});

		// Return the stream with proper headers
		return result.toDataStreamResponse();
	} catch (error) {
		console.error("Chat API Error:", error);
		return new Response(
			JSON.stringify({
				error: "Internal Server Error",
				details: error instanceof Error ? error.message : "Unknown error",
			}),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	}
}
