import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function ChatLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className="flex flex-col p-4">
				<SidebarTrigger className="-ml-1 absolute top-4 left-4" />
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
