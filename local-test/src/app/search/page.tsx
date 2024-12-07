"use client";

import SearchPage from "@/components/pages/Search";
import { useSearchParams } from "next/navigation";

export default function Search() {
	const keyword = useSearchParams().get("keyword") || "";
	const label = useSearchParams().get("label") || "";
	const hashtag = useSearchParams().get("hashtag") || "";
	return <SearchPage keyword={keyword} label={label} hashtag={hashtag} />;
}
