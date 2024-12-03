"use client";

import { RightSidebar, Sidebar } from "@/components/layouts";
import { HomeHeader } from "@/components/pages/Home";

export default function HomeLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="flex">
			<Sidebar />
			<HomeHeader />
			<div className="flex-grow lg:ml-72">
				<main className="pt-14 max-[calc(100vw-32rem)]:">
					{children}
				</main>
			</div>
			<RightSidebar />
		</div>
	);
}
