"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export function ConfirmationDialog({
	children,
	...props
}: React.ComponentProps<typeof AlertDialog> & {
	title: string;
	description: string;
	action: string;
	cancel: string;
	onAction?: () => void;
	onCancel?: () => void;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const { title, description, action, cancel, onAction, onCancel, ...rest } = props;
	return (
		<AlertDialog
			open={isOpen}
			onOpenChange={setIsOpen}
			{...rest}
		>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel
						onClick={() => {
							onCancel?.();
							setIsOpen(false);
						}}
					>
						{cancel}
					</AlertDialogCancel>
					<AlertDialogAction
						className="!bg-accent hover:!bg-accent/80 text-accent-foreground"
						onClick={() => {
							onAction?.();
							setIsOpen(false);
						}}
					>
						{action}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
