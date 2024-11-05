"use client";

import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function Root() {
	const { loading } = useAuthRedirect();

	if (loading) return <p>Loading...</p>;

	return null;
}
