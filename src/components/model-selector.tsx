"use client";

import { models } from "@/app/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface ModelSelectorProps {
	value: string;
	onValueChange: (value: string) => void;
}

export function ModelSelector({ value, onValueChange }: ModelSelectorProps) {
	return (
		<Select
			value={value}
			onValueChange={onValueChange}
		>
			<SelectTrigger className="bg-accent text-black-200 border-none">
				<SelectValue placeholder="Select a model" />
			</SelectTrigger>
			<SelectContent
				className="w-50"
				align="center"
			>
				{models.map((model) => (
					<SelectItem
						key={model.id}
						value={model.id}
					>
						{model.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
