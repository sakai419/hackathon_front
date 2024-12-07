import DynamicTabs from "@/components/common/DynamicTabs";
import { useState } from "react";
import UserResults from "./components/UserResults";
import LatestTweetResults from "./components/LatestTweetResults";
import PopularTweetResults from "./components/PopularTweetResults";
import { useRouter } from "next/navigation";
import { SearchForm } from "@/components/common";

interface SearchPageProps {
	keyword: string;
	label: string;
}

export default function SearchPage({ keyword, label }: SearchPageProps) {
	const router = useRouter();
	const [searchKeyword, setSearchKeyword] = useState(keyword);
	const [activeTab, setActiveTab] = useState("トップ");

	const tabNames = ["トップ", "最新"];
	if (keyword || (!label && !keyword)) {
		tabNames.push("ユーザー");
	}

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		router.push(`/search?keyword=${searchKeyword}`);
	};

	return (
		<div className="container w-full mx-auto">
			<div className="container mx-auto p-4">
				<div className="relative flex items-center">
					<SearchForm
						keyword={searchKeyword}
						setKeyword={setSearchKeyword}
						onSubmit={handleSearch}
					/>
				</div>
			</div>
			<DynamicTabs
				tabNames={tabNames}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
			{activeTab === "トップ" && (
				<PopularTweetResults keyword={keyword} label={label} />
			)}
			{activeTab === "最新" && (
				<LatestTweetResults keyword={keyword} label={label} />
			)}
			{activeTab === "ユーザー" ? (
				<UserResults keyword={keyword} />
			) : null}
		</div>
	);
}
