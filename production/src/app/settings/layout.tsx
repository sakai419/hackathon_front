"use client";

import { LeftSidebar, RightSidebar } from "@/components/layouts";
import { SettingsHeader } from "@/components/pages/Settings";
import { ClientProfileProvider } from "@/context";

export default function SearchLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClientProfileProvider>
			<div className="flex h-screen">
				<LeftSidebar />
				<div className="flex flex-col flex-grow">
					<SettingsHeader />
					<main className="flex-grow overflow-auto mt-14">
						{children}
					</main>
				</div>
				<RightSidebar />
			</div>
		</ClientProfileProvider>
	);
}
