"use client";

import { models } from "@/app/constants";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function ModelSelector() {
	const [model, setModel] = useState("gpt-4o");
	return (
		<Select
			value={model}
			onValueChange={setModel}
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
