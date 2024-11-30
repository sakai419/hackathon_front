import DynamicTabs from "@/components/common/DynamicTab";
import { Card, CardContent, Input } from "@/components/ui";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import UserResults from "./components/UserResults";

export default function SearchPage() {
	const [keyword, setKeyword] = useState("");
	const [activeTab, setActiveTab] = useState("トップ");

	const tabNames = ["トップ", "最新", "ユーザー"];

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Searching for:", keyword);
		// Here you would typically call an API to fetch search results
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
				<SearchResults type="top" query={keyword} />
			)}
			{activeTab === "最新" && (
				<SearchResults type="latest" query={keyword} />
			)}
			{activeTab === "ユーザー" ? (
				<UserResults keyword={keyword} />
			) : null}
		</div>
	);
}

function SearchResults({
	type,
	query,
}: {
	type: "top" | "latest";
	query: string;
}) {
	// 実際のアプリケーションでは、この部分でAPIから結果を取得します
	const results = [
		{
			id: 1,
			user: "ユーザー1",
			content: "検索結果のコンテンツ1",
			timestamp: "2分前",
		},
		{
			id: 2,
			user: "ユーザー2",
			content: "検索結果のコンテンツ2",
			timestamp: "1時間前",
		},
		{
			id: 3,
			user: "ユーザー3",
			content: "検索結果のコンテンツ3",
			timestamp: "3時間前",
		},
	];

	useEffect(() => {
		console.log("SearchResults", type, query);
	});

	return (
		<div className="">
			{results.map((result) => (
				<Card key={result.id}>
					<CardContent className="p-4">
						<div className="flex items-start space-x-4">
							<Avatar>
								<AvatarImage
									src={`/placeholder.svg?height=40&width=40`}
								/>
								<AvatarFallback>
									{result.user[0]}
								</AvatarFallback>
							</Avatar>
							<div className="flex-1">
								<div className="flex items-center space-x-2">
									<h3 className="font-bold">{result.user}</h3>
									<span className="text-sm text-gray-500">
										{result.timestamp}
									</span>
								</div>
								<p>{result.content}</p>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
