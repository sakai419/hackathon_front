"use client";

import { Sidebar } from "@/components/layouts";
import { NotificationHeader } from "@/components/pages/Notification";

export default function NotificationsLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<Sidebar />
			<NotificationHeader />
			<div className="flex-grow">
				<main className="ml-64 pt-14 p-4">{children}</main>
			</div>
		</>
	);
}
