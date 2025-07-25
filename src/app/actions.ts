"use server";

import { db } from "@/db";
import { chats, projects } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, desc, eq, InferSelectModel, isNull } from "drizzle-orm";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const addProjectSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	description: z.string().min(1, { message: "Description is required" }),
	systemPrompt: z.string().min(1, { message: "System prompt is required" }),
});

type Project = InferSelectModel<typeof projects>;
type Chat = InferSelectModel<typeof chats>;
type State<T> = {
	error: string | { name?: string[]; description?: string[]; systemPrompt?: string[] } | null;
	success: string | null;
	data: T | null;
	input: z.infer<typeof addProjectSchema> | undefined;
};

export async function getUserProjects(): Promise<Project[]> {
	const { userId } = await auth();
	if (!userId) {
		return [];
	}
	const userProjects = await db.query.projects.findMany({
		where: eq(projects.userId, userId),
		orderBy: [desc(projects.createdAt)],
	});
	return userProjects;
}

export async function getUserChats(): Promise<Chat[]> {
	const { userId } = await auth();
	if (!userId) {
		return [];
	}
	const userChats = await db.query.chats.findMany({
		where: and(eq(chats.userId, userId), isNull(chats.projectId)),
		orderBy: [desc(chats.createdAt)],
	});
	return userChats;
}

export async function getUserProject(projectId: string): Promise<Project | undefined> {
	const { userId } = await auth();
	if (!userId) {
		return undefined;
	}

	const userProject = await db.query.projects.findFirst({
		where: and(eq(projects.id, projectId), eq(projects.userId, userId)),
	});
	return userProject;
}

export async function getProjectChats(projectId: string): Promise<Chat[]> {
	const projectChats = await db.query.chats.findMany({
		where: eq(chats.projectId, projectId),
	});
	return projectChats;
}

export async function addProject(prevState: State<Project>, formData: FormData): Promise<State<Project>> {
	const validatedFields = addProjectSchema.safeParse({
		name: formData.get("name"),
		description: formData.get("description"),
		systemPrompt: formData.get("system-prompt"),
	});

	try {
		const { userId } = await auth();
		if (!userId) {
			return { error: "Unauthorized", success: null, data: null, input: validatedFields.data };
		}

		if (!validatedFields.success) {
			return {
				error: validatedFields.error.flatten().fieldErrors,
				success: null,
				data: null,
				input: validatedFields.data,
			};
		}

		const { name, description, systemPrompt } = validatedFields.data;

		const [project] = await db
			.insert(projects)
			.values({
				id: nanoid(10),
				name,
				description,
				systemPrompt: systemPrompt as string,
				userId: userId,
				createdBy: userId,
				createdAt: new Date(),
				updatedAt: new Date(),
			})
			.returning();

		revalidatePath("/");

		return { success: "Project created successfully", data: project, error: null, input: undefined };
	} catch (error) {
		console.error("Error creating project:", error);
		return { error: "Failed to create project", success: null, data: null, input: validatedFields.data };
	}
}

export async function deleteProject(projectId: string): Promise<State<Project>> {
	try {
		const { userId } = await auth();
		if (!userId) {
			return { error: "Unauthorized", success: null, data: null, input: undefined };
		}

		const [project] = await db
			.delete(projects)
			.where(and(eq(projects.id, projectId), eq(projects.userId, userId)))
			.returning();

		revalidatePath("/");

		return { success: "Project deleted successfully", data: project, error: null, input: undefined };
	} catch (error) {
		console.error("Error deleting project:", error);
		return { error: "Failed to delete project", success: null, data: null, input: undefined };
	}
}

export async function deleteChat(chatId: string): Promise<State<Chat>> {
	try {
		const { userId } = await auth();
		if (!userId) {
			return { error: "Unauthorized", success: null, data: null, input: undefined };
		}

		const [chat] = await db
			.delete(chats)
			.where(and(eq(chats.id, chatId), eq(chats.userId, userId)))
			.returning();

		revalidatePath("/");

		return { success: "Chat deleted successfully", data: chat, error: null, input: undefined };
	} catch (error) {
		console.error("Error deleting chat:", error);
		return { error: "Failed to delete chat", success: null, data: null, input: undefined };
	}
}

export async function moveChat(chatId: string, projectId: string): Promise<State<Chat>> {
	try {
		const { userId } = await auth();
		if (!userId) {
			return { error: "Unauthorized", success: null, data: null, input: undefined };
		}

		const [chat] = await db
			.update(chats)
			.set({ projectId })
			.where(and(eq(chats.id, chatId), eq(chats.userId, userId)))
			.returning();

		return { success: "Chat moved successfully", data: chat, error: null, input: undefined };
	} catch (error) {
		console.error("Error moving chat:", error);
		return { error: "Failed to move chat", success: null, data: null, input: undefined };
	}
}
