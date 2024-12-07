"use client";
import { EngagementsHeader } from "@/components/pages/Engagement";

export default function EngagementsLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="flex h-screen">
			<div className="flex flex-col flex-grow">
				<EngagementsHeader />
				<main className="flex-grow overflow-auto mt-14 max-w-[calc(100vw-38rem)]">
					{children}
				</main>
			</div>
		</div>
	);
}
