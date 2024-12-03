"use client";

import { RightSidebar, Sidebar } from "@/components/layouts";
import { NotificationHeader } from "@/components/pages/Notification";

export default function NotificationsLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="flex">
			<Sidebar />
			<NotificationHeader />
			<div className="flex-grow lg:ml-72">
				<main className="pt-14 max-[calc(100vw-32rem)]:">
					{children}
				</main>
			</div>
			<RightSidebar />
		</div>
	);
}
