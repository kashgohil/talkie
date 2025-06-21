"use client";

import { Trash2 } from "lucide-react";
import { ConfirmationDialog } from "./confirmation-dialog";
import { Button } from "./ui/button";

export function DeleteChatButton({ chatId, onDelete }: { chatId: string; onDelete: (chatId: string) => void }) {
	return (
		<ConfirmationDialog
			title="Delete Chat"
			description="Are you sure you want to delete this chat?"
			action="Delete"
			cancel="Cancel"
			onAction={() => onDelete(chatId)}
		>
			<Button
				variant="ghost"
				size="icon"
				className="!p-1"
			>
				<Trash2
					size={8}
					className="text-wisteria-500 group-hover/menu-item:text-accent-foreground"
				/>
			</Button>
		</ConfirmationDialog>
	);
}
