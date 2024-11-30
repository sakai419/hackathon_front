"use client";

import Sidebar from "@/components/layouts/Sidebar";

export default function SearchLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<Sidebar />
			<div className="flex-grow">
				<main className="ml-64 px-4">{children}</main>
			</div>
		</>
	);
}
