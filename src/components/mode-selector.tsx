"use client";

import { modes } from "@/app/constants";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

export function ModeSelector() {
	const [mode, setMode] = useState("chat");
	return (
		<ToggleGroup
			value={mode}
			onValueChange={setMode}
			type="single"
			variant="outline"
		>
			{modes.map((mode) => (
				<ToggleGroupItem
					key={mode.id}
					value={mode.id}
				>
					{mode.name}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}
