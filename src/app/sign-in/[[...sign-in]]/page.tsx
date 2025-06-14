import { SignIn } from "@clerk/nextjs";
import { Flower } from "lucide-react";

export default function Page() {
	return (
		<div className="flex flex-col items-center justify-center h-screen w-screen space-y-4 relative bg-black-200">
			<div className="flex h-[70%] items-center space-x-2 animate-slow-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<Flower className="h-full w-full text-accent opacity-50" />
			</div>
			<SignIn routing="hash" />
		</div>
	);
}
