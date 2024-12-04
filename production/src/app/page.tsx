"use client";

import { LoadingScreen } from "@/components/common";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function Root() {
	const { loading } = useAuthRedirect();

	if (loading) return <LoadingScreen />;

	return null;
}
