"use client";
import { EngagementsHeader } from "@/components/pages/Engagement";
import {} from "@/components/pages/TweetDetail";

export default function EngagementsLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="flex">
			<EngagementsHeader />
			<div className="flex-grow">
				<main>{children}</main>
			</div>
		</div>
	);
}
