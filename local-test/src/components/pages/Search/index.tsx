import DynamicTabs from "@/components/common/DynamicTabs";
import { Input } from "@/components/ui";
import { Search } from "lucide-react";
import { useState } from "react";
import UserResults from "./components/UserResults";
import LatestTweetResults from "./components/LatestTweetResults";
import PopularTweetResults from "./components/PopularTweetResults";

export default function SearchPage() {
	const [keyword, setKeyword] = useState("");
	const [searchKeyword, setSearchKeyword] = useState("");
	const [activeTab, setActiveTab] = useState("トップ");

	const tabNames = ["トップ", "最新", "ユーザー"];

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		setSearchKeyword(keyword);
	};

	return (
		<div className="container max-w-2xl mx-auto px-4">
			<div className="container mx-auto px-4 py-4">
				<div className="relative flex items-center">
					<form
						onSubmit={handleSearch}
						className="w-full relative flex items-center bg-gray-100 rounded-full"
					>
						<Search className="absolute left-4 text-gray-500 w-5 h-5" />
						<Input
							type="search"
							placeholder="検索"
							value={keyword}
							onChange={(e) => setKeyword(e.target.value)}
							className="pl-12 pr-4 py-3 w-full bg-transparent border-none focus-visible:ring-0 placeholder-gray-500"
						/>
					</form>
				</div>
			</div>
			<DynamicTabs
				tabNames={tabNames}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
			{activeTab === "トップ" && (
				<PopularTweetResults keyword={searchKeyword} />
			)}
			{activeTab === "最新" && (
				<LatestTweetResults keyword={searchKeyword} />
			)}
			{activeTab === "ユーザー" ? (
				<UserResults keyword={searchKeyword} />
			) : null}
		</div>
	);
}
