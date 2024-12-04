"use client";

import { RightSidebar, Sidebar } from "@/components/layouts";
import { HomeHeader } from "@/components/pages/Home";
import { ClientProfileProvider } from "@/context/ClientProfileProvider";

export default function HomeLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClientProfileProvider>
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
		</ClientProfileProvider>
	);
}
