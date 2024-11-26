"use client";

import { NotificationHeader } from "@/components/pages/Notification";

export default function NotificationsLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<NotificationHeader />
			<div className="flex-grow">
				<main className="ml-64 pt-14 p-4">{children}</main>
			</div>
		</>
	);
}
