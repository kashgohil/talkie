import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export async function generateMetadata() {
	return {
		title: "Wisteria - AI Chat",
		description: "Chat with AI like never before",
	};
}

export default function ChatLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SidebarProvider className="h-screen">
			<AppSidebar />
			<SidebarInset>
				<SidebarTrigger className="-ml-1 absolute top-4 left-4" />
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
