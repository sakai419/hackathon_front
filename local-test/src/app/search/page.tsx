"use client";

import SearchPage from "@/components/pages/Search";
import { useSearchParams } from "next/navigation";

export default function Search() {
	const keyword = useSearchParams().get("keyword") || "";
	return <SearchPage keyword={keyword} />;
}
