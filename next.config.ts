import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	rewrites: async () => {
		return [
			{
				source: "/chat/:chatID",
				destination: "/?chatID=:chatID",
			},
		];
	},
};

export default nextConfig;
