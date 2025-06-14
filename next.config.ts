import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	rewrites: async () => {
		return [
			{
				source: "/chat/:chatID",
				destination: "/chat?id=:chatID",
			},
		];
	},
};

export default nextConfig;
