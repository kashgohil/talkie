import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Wisteria - AI Chat",
	description: "Chat with AI like never before",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider
			appearance={{
				variables: {
					colorPrimary: "#a3a0f3",
					colorTextOnPrimaryBackground: "#000",
					colorInputText: "#ffffff",
				},
			}}
		>
			<html lang="en">
				<body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black-200 text-white-400`}>
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
