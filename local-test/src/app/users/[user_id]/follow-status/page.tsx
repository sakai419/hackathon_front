"use client";

import { FollowStatusPage } from "@/components/pages/FollowStatus";
import { useParams } from "next/navigation";

export default function FollowStatus() {
	const user_id = useParams()?.user_id;
	if (typeof user_id === "undefined") {
		return null;
	}
	return <FollowStatusPage userId={user_id?.toString()} />;
}
