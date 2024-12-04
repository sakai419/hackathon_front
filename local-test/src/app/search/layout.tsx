"use client";

import { RightSidebar, Sidebar } from "@/components/layouts";
import { ClientProfileProvider } from "@/context/ClientProfileProvider";

export default function SearchLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClientProfileProvider>
			<div className="flex">
				<Sidebar />
				<div className="flex-grow">
					<main className="ml-72 px-4">{children}</main>
				</div>
				<RightSidebar withSearch={false} />
			</div>
		</ClientProfileProvider>
	);
}
