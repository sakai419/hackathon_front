"use client";

import { LeftSidebar } from "@/components/layouts";
import { AdminHeader } from "@/components/pages/Admin";
import { ClientProfileProvider } from "@/context";

export default function MessageLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClientProfileProvider>
			<div className="flex h-screen">
				<LeftSidebar />
				<AdminHeader />
				<div className="flex flex-col flex-grow">
					<main className="flex-grow overflow-auto max-w-[calc(100vw-18rem)] mt-14">
						{children}
					</main>
				</div>
			</div>
		</ClientProfileProvider>
	);
}
