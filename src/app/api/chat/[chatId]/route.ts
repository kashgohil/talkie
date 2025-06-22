import { db } from "@/db";
import { messages as messagesTable } from "@/db/schema";
import { Message } from "@ai-sdk/react";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ chatId: string }> }) {
	const { chatId } = await params;
	const { userId } = await auth();

	const messages = await db
		.select()
		.from(messagesTable)
		.where(and(eq(messagesTable.chatId, chatId), eq(messagesTable.userId, userId!)));

	return NextResponse.json(messages as unknown as Message[]);
}
