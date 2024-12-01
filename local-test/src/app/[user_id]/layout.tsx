"use client";

import Sidebar from "@/components/layouts/Sidebar";
import { ProfileHeader } from "@/components/pages/Profile";
import { useParams } from "next/navigation";

export default function ProfileLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const user_id = useParams()?.user_id;
	if (typeof user_id === "undefined") {
		return null;
	}

	return (
		<>
			<Sidebar />
			<ProfileHeader userId={user_id?.toString()} />
			<div className="flex-grow">
				<main className="ml-64 pt-14 p-4">{children}</main>
			</div>
		</>
	);
}
