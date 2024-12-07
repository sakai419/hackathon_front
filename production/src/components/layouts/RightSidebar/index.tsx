import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import RecentLabelsCard from "./components/RecentLabelsCard";
import { useRouter } from "next/navigation";
import { ErrorMessage, LoadingScreen, SearchForm } from "@/components/common";
import useRightSidebarInfo from "@/hooks/useRightSidebarInfo";
import FollowSuggestList from "./components/FollowSuggestList";

interface RightSidebarProps {
	withSearch?: boolean;
}

export default function RightSidebar({ withSearch = true }: RightSidebarProps) {
	const router = useRouter();
	const [searchKeyword, setSearchKeyword] = useState("");
	const { sidebarInfo, isLoading, error } = useRightSidebarInfo();

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		router.push(`/search?keyword=${searchKeyword}`);
	};

	if (error) {
		return <ErrorMessage error={error} />;
	}

	return (
		<aside className="w-80 lg:flex flex-col h-screen sticky top-0 right-0 border-x-2 z-40">
			{withSearch && (
				<SearchForm
					keyword={searchKeyword}
					setKeyword={setSearchKeyword}
					onSubmit={handleSearch}
				/>
			)}
			{isLoading && <LoadingScreen />}
			{sidebarInfo && (
				<ScrollArea className="flex-grow">
					<div className="p-4 space-y-6">
						<RecentLabelsCard labels={sidebarInfo.recentLabels} />
						<FollowSuggestList
							followSuggestions={sidebarInfo.followSuggestions}
						/>
					</div>
				</ScrollArea>
			)}
		</aside>
	);
}
