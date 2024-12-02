"use client";

import { RightSidebar, Sidebar } from "@/components/layouts";

export default function SearchLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="flex">
			<Sidebar />
			<div className="flex-grow">
				<main className="ml-64 px-4">{children}</main>
			</div>
			<RightSidebar />
		</div>
	);
}
