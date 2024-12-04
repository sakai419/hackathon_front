"use client";

import { RightSidebar, Sidebar } from "@/components/layouts";
import { SettingsHeader } from "@/components/pages/Settings";
import { ClientProfileProvider } from "@/context";

export default function SearchLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClientProfileProvider>
			<div className="flex">
				<Sidebar />
				<SettingsHeader />
				<div className="flex-grow">
					<main className="ml-72 pt-14 px-4">{children}</main>
				</div>
				<RightSidebar withSearch={false} />
			</div>
		</ClientProfileProvider>
	);
}
