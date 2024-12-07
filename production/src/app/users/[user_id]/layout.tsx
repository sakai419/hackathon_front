"use client";

import { LeftSidebar, RightSidebar } from "@/components/layouts";
import { ProfileHeader } from "@/components/pages/Profile";
import { ClientProfileProvider } from "@/context";
import { useParams } from "next/navigation";

export default function ProfileLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const user_id = useParams()?.user_id;
	if (typeof user_id === "undefined") {
		return null;
	}

	return (
		<ClientProfileProvider>
			<div className="flex h-screen">
				<LeftSidebar />
				<div className="flex flex-col flex-grow">
					<ProfileHeader userId={user_id.toString()} />
					<main className="flex-grow overflow-auto mt-14 max-w-[calc(100vw-38rem)]">
						{children}
					</main>
				</div>
				<RightSidebar />
			</div>
		</ClientProfileProvider>
	);
}
