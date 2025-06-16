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
	const { title, description, action, cancel, onAction, onCancel, ...rest } = props;
	return (
		<AlertDialog {...rest}>
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
						}}
					>
						{cancel}
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => {
							onAction?.();
						}}
					>
						{action}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
