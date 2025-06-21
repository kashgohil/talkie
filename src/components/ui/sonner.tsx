"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps, toast as sonnerToast } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster group"
			style={
				{
					"--normal-bg": "var(--accent)",
					"--normal-text": "var(--accent-foreground)",
					"--normal-border": "var(--border)",
				} as React.CSSProperties
			}
			{...props}
		/>
	);
};

export function toast(toast: Omit<ToastProps, "id">) {
	return sonnerToast.custom((id) => (
		<Toast
			id={id}
			title={toast.title}
			description={toast.description}
			type={toast.type}
		/>
	));
}

function Toast(props: ToastProps) {
	const { title, description, type } = props;

	return (
		<div className="flex rounded-lg bg-white shadow-lg ring-1 ring-black/5 w-full md:max-w-[364px] items-center p-4">
			<div className="flex flex-1 items-center">
				<div className="w-full">
					<p className="text-sm font-medium text-gray-900">{title}</p>
					<p className="mt-1 text-sm text-gray-500">{description}</p>
				</div>
			</div>
			<div
				className={cn(
					"ml-5 shrink-0 rounded-md text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:outline-hidden",
					type === "success"
						? "text-wisteria-500 hover:text-wisteria-600 focus:ring-wisteria-500"
						: "text-red-500 hover:text-red-600 focus:ring-red-500"
				)}
			></div>
		</div>
	);
}

interface ToastProps {
	id: string | number;
	title: string;
	description: string;
	type: "success" | "error";
}

export { Toaster };
