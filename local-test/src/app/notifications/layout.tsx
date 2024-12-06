"use client";

import { LeftSidebar, RightSidebar } from "@/components/layouts";
import { NotificationHeader } from "@/components/pages/Notification";
import { ClientProfileProvider } from "@/context";

export default function NotificationsLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClientProfileProvider>
			<div className="flex h-screen">
				<LeftSidebar />
				<div className="flex flex-col flex-grow">
					<NotificationHeader />
					<main className="flex-grow overflow-auto mt-14">
						{children}
					</main>
				</div>
				<RightSidebar />
			</div>
		</ClientProfileProvider>
	);
}
