import { getUserProject } from "@/app/actions";
import { notFound } from "next/navigation";

export default async function ProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
	const { projectId } = await params;
	const userProject = await getUserProject(projectId);
	if (!userProject) {
		return notFound();
	}
	return <div>{userProject.name}</div>;
}
