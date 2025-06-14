import { Button } from "@/components/ui/button";
import { WisteriaLoom } from "@/components/wisteria-loom";
import { Flower } from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex items-center justify-center h-screen w-screen bg-black-200">
			<WisteriaLoom className="absolute top-0 left-1/2 -translate-x-1/2 scale-150 translate-y-[200px]" />
			<div className="flex flex-col items-center justify-center space-y-4 z-10">
				<Flower className="h-16 w-16 text-accent" />
				<div className="flex flex-col items-center justify-center space-y-4">
					<div className="flex flex-col text-center">
						<h1 className="text-2xl font-bold text-accent">Wisteria</h1>
						<p className="text-sm text-accent"></p>
					</div>
					<Link href="/sign-in">
						<Button className="bg-accent hover:bg-accent/90 text-black-200">Sign In</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
