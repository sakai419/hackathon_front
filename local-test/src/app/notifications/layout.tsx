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
					<main className="flex-grow overflow-auto mt-14 max-w-[calc(100vw-38rem)]">
						{children}
					</main>
				</div>
				<RightSidebar />
			</div>
		</ClientProfileProvider>
	);
}
