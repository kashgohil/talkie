import { ModeSelector } from "@/components/mode-selector";
import { ModelSelector } from "@/components/model-selector";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Flower, Paperclip } from "lucide-react";

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
							<ModelSelector />
							<ModeSelector />
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
