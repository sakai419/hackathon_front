import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ["firebasestorage.googleapis.com"],
	},
	reactStrictMode: false,
};

export default nextConfig;
