import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Flower, Paperclip } from "lucide-react";
import { models, modes } from "../constants";

export default function Home() {
	return (
		<>
			<div className="mx-auto lg:max-w-1/2 sm:max-w-full flex items-center justify-center flex-1">
				<Flower className="text-wisteria-500 h-[50%] w-[50%] opacity-50" />
			</div>
			<div className="flex">
				<div className="p-4 border border-wisteria-500 rounded-lg w-full lg:max-w-1/2 sm:max-w-full mx-auto relative bg-accent/10 backdrop-blur-sm">
					<Textarea
						className="border-none outline-none focus-within:outline-none resize-none h-11 !p-0"
						placeholder="Type your message here..."
						id="message"
					/>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Select defaultValue="gpt-4o">
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
							<ToggleGroup
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
						</div>

						<div className="flex items-center gap-2">
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										className="bg-transparent hover:bg-accent border-accent"
										variant="outline"
										interactive
										size="icon"
									>
										<Paperclip />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Attach a file</p>
								</TooltipContent>
							</Tooltip>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
