import { getUserProject } from "@/app/actions";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export async function generateMetadata({ params }: { params: Promise<{ projectId: string }> }) {
	const { projectId } = await params;
	const project = await getUserProject(projectId);
	if (!project) {
		return {
			title: "Wisteria - AI Chat",
			description: "Project not found",
		};
	}
	return {
		title: `${project.name} - Wisteria`,
		description: project.description,
		openGraph: {
			images: ["./wisteria.svg"],
		},
	};
}

export default function ProjectLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SidebarProvider>
			<AppSidebar projects />
			<SidebarInset className="flex flex-col p-4">
				<SidebarTrigger className="-ml-1 absolute top-4 left-4" />
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
