"use client";

import { LeftSidebar, RightSidebar } from "@/components/layouts";
import { TweetDetailHeader } from "@/components/pages/TweetDetail";
import { ClientProfileProvider } from "@/context";

export default function TweetDetailLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClientProfileProvider>
			<div className="flex h-screen">
				<LeftSidebar />
				<div className="flex flex-col flex-grow">
					<TweetDetailHeader />
					<main className="flex-grow overflow-auto mt-14">
						{children}
					</main>
				</div>
				<RightSidebar />
			</div>
		</ClientProfileProvider>
	);
}
