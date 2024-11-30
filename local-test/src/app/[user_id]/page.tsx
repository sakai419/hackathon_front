"use client";

import { ProfilePage } from "@/pages/Profile";
import { useParams } from "next/navigation";

export default function Profile() {
	const user_id = useParams().user_id;
	if (typeof user_id === "undefined") {
		return null;
	}
	return <ProfilePage userId={user_id?.toString()} />;
}
