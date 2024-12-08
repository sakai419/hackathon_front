"use client";

import UserReportsPage from "@/components/pages/UserReports";
import { useParams } from "next/navigation";

export default function UserReports() {
	const user_id = useParams()?.user_id;
	if (typeof user_id === "undefined") {
		return null;
	}
	return <UserReportsPage userId={user_id?.toString()} />;
}
