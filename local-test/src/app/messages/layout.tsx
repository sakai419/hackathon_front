"use client";

import { LeftSidebar } from "@/components/layouts";
import { ClientProfileProvider } from "@/context";

export default function MessageLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClientProfileProvider>
			<div className="flex h-screen">
				<LeftSidebar />
				<div className="flex flex-col flex-grow">
					<main className="flex-grow overflow-auto">{children}</main>
				</div>
			</div>
		</ClientProfileProvider>
	);
}
