"use client";

import { useState } from "react";
import { ConfirmationDialog } from "./confirmation-dialog";

export function DeleteChatButton({ chatId, onDelete }: { chatId: string; onDelete: (chatId: string) => void }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<ConfirmationDialog
			open={isOpen}
			onOpenChange={setIsOpen}
			title="Delete Chat"
			description="Are you sure you want to delete this chat?"
			action="Delete"
			cancel="Cancel"
			onAction={() => onDelete(chatId)}
		/>
	);
}
