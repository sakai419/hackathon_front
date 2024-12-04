"use client";

import { RightSidebar, Sidebar } from "@/components/layouts";
import { TweetDetailHeader } from "@/components/pages/TweetDetail";
import { ClientProfileProvider } from "@/context";

export default function TweetDetailLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClientProfileProvider>
			<div className="flex">
				<Sidebar />
				<TweetDetailHeader />
				<div className="flex-grow">
					<main className="ml-72 pt-14">{children}</main>
				</div>
				<RightSidebar />
			</div>
		</ClientProfileProvider>
	);
}
