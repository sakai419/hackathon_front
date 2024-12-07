"use client";

import { LeftSidebar, RightSidebar } from "@/components/layouts";
import { ClientProfileProvider } from "@/context";

export default function SearchLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClientProfileProvider>
			<div className="flex h-screen">
				<LeftSidebar />
				<div className="flex flex-col flex-grow">
					<main className="max-w-[calc(100vw-38rem)] flex-grow overflow-auto">
						{children}
					</main>
				</div>
				<RightSidebar withSearch={false} />
			</div>
		</ClientProfileProvider>
	);
}
