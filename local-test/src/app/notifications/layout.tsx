"use client";

import { RightSidebar, Sidebar } from "@/components/layouts";
import { NotificationHeader } from "@/components/pages/Notification";
import { ClientProfileProvider } from "@/context/ClientProfileProvider";

export default function NotificationsLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClientProfileProvider>
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
		</ClientProfileProvider>
	);
}
