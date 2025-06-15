import { db } from "@/db";
import { projects } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const userProjects = await db.select().from(projects).where(eq(projects.userId, userId));

		return NextResponse.json(userProjects);
	} catch (error) {
		console.error("Error fetching projects:", error);
		return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await request.json();
		const { name, description, systemPrompt } = body;

		if (!name) {
			return NextResponse.json({ error: "Name is required" }, { status: 400 });
		}

		const project = await db
			.insert(projects)
			.values({
				id: nanoid(),
				name,
				description,
				systemPrompt,
				userId,
				createdBy: userId,
				createdAt: new Date(),
				updatedAt: new Date(),
			})
			.returning();

		return NextResponse.json(project[0]);
	} catch (error) {
		console.error("Error creating project:", error);
		return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
	}
}
