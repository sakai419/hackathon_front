"use client";

import { Sidebar } from "@/components/layouts";
import { EngagementsHeader } from "@/components/pages/Engagement";
import {} from "@/components/pages/TweetDetail";

export default function EngagementsLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div>
			<Sidebar />
			<EngagementsHeader />
			<div className="flex-grow">
				<main className="ml-64 pt-14 p-4">{children}</main>
			</div>
		</div>
	);
}
