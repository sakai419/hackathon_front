"use client";

import { RightSidebar, Sidebar } from "@/components/layouts";
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
			<div className="flex">
				<Sidebar />
				<ProfileHeader userId={user_id?.toString()} />
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
