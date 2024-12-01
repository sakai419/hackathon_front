"use client";

import { Sidebar } from "@/components/layouts";
import { HomeHeader } from "@/components/pages/Home";

export default function HomeLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<Sidebar />
			<HomeHeader />
			<div className="flex-grow">
				<main className="ml-64 pt-14 p-4">{children}</main>
			</div>
		</>
	);
}
