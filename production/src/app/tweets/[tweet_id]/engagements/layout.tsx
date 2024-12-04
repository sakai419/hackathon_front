"use client";
import { EngagementsHeader } from "@/components/pages/Engagement";

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
