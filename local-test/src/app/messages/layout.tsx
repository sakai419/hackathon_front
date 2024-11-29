"use client";

import Sidebar from "@/components/layouts/Sidebar";

export default function MessageLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<Sidebar />
			<div className="flex-grow">
				<main className="ml-64 pl-8">{children}</main>
			</div>
		</>
	);
}
