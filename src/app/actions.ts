"use server";

import { db } from "@/db";
import { projects } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { desc, eq, InferInsertModel } from "drizzle-orm";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const addProjectSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	description: z.string().min(1, { message: "Description is required" }),
	systemPrompt: z.string().min(1, { message: "System prompt is required" }),
});

type Project = InferInsertModel<typeof projects>;
type State = {
	error: string | { name?: string[]; description?: string[]; systemPrompt?: string[] } | null;
	success: string | null;
	project: Project | null;
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

export async function addProject(prevState: State, formData: FormData): Promise<State> {
	const validatedFields = addProjectSchema.safeParse({
		name: formData.get("name"),
		description: formData.get("description"),
		systemPrompt: formData.get("system-prompt"),
	});

	try {
		const { userId } = await auth();
		if (!userId) {
			return { error: "Unauthorized", success: null, project: null, input: validatedFields.data };
		}

		if (!validatedFields.success) {
			return {
				error: validatedFields.error.flatten().fieldErrors,
				success: null,
				project: null,
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

		return { success: "Project created successfully", project, error: null, input: undefined };
	} catch (error) {
		console.error("Error creating project:", error);
		return { error: "Failed to create project", success: null, project: null, input: validatedFields.data };
	}
}
