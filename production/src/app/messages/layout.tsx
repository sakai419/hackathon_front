"use client";

import { Sidebar } from "@/components/layouts";
import { ClientProfileProvider } from "@/context";

export default function MessageLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<ClientProfileProvider>
			<Sidebar />
			<div className="flex-grow">
				<main className="ml-64 pl-8">{children}</main>
			</div>
		</ClientProfileProvider>
	);
}
