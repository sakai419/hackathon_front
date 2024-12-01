"use client";

import Sidebar from "@/components/layouts/Sidebar";
import { TweetDetailHeader } from "@/components/pages/TweetDetail";

export default function TweetDetailLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div>
			<Sidebar />
			<TweetDetailHeader />
			<div className="flex-grow">
				<main className="ml-64 pt-14 p-4">{children}</main>
			</div>
		</div>
	);
}
