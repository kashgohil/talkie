import { getUserProjects } from "@/app/actions";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu } from "@/components/ui/sidebar";
import { AddProject } from "./add-project";
import { ProjectList } from "./project-list";

async function ProjectsList() {
	const userProjects = await getUserProjects();
	if (!userProjects?.length) {
		return <div className="flex p-2 text-sm items-center justify-center h-full">No projects yet.</div>;
	}

	return (
		<SidebarMenu>
			<ProjectList projects={userProjects} />
		</SidebarMenu>
	);
}

export async function NavProjects() {
	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel className="text-wisteria-500 flex items-center gap-2 justify-between">
				<span>Projects</span>
				<AddProject />
			</SidebarGroupLabel>
			<ProjectsList />
		</SidebarGroup>
	);
}
