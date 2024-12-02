import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "lucide-react";
import RecentLabelsCard from "./RecentLabelsCard";
import { useRouter } from "next/navigation";
import { SearchForm } from "@/components/common";

interface RightSidebarProps {
	withSearch?: boolean;
}

export default function RightSidebar({ withSearch = true }: RightSidebarProps) {
	const router = useRouter();
	const [searchKeyword, setSearchKeyword] = useState("");

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		router.push(`/search?keyword=${searchKeyword}`);
	};

	return (
		<aside className="w-80 hidden lg:flex flex-col h-screen sticky top-0 right-0 border-x-2">
			{withSearch && (
				<SearchForm
					keyword={searchKeyword}
					setKeyword={setSearchKeyword}
					onSubmit={handleSearch}
				/>
			)}
			<ScrollArea className="flex-grow">
				<div className="p-4 space-y-6">
					<RecentLabelsCard />
					<Card>
						<CardHeader>
							<CardTitle>おすすめユーザー</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{suggestedUsers.map((user, index) => (
								<div
									key={index}
									className="flex items-center justify-between"
								>
									<div className="flex items-center space-x-3">
										<Avatar>
											<AvatarImage
												src={user.avatarUrl}
												alt={user.name}
											/>
											<AvatarFallback>
												<User />
											</AvatarFallback>
										</Avatar>
										<div>
											<p className="font-semibold">
												{user.name}
											</p>
											<p className="text-sm text-muted-foreground">
												@{user.username}
											</p>
										</div>
									</div>
									<Button variant="outline" size="sm">
										フォロー
									</Button>
								</div>
							))}
						</CardContent>
					</Card>

					<footer className="text-sm text-muted-foreground">
						<nav className="flex flex-wrap gap-2">
							<a href="#" className="hover:underline">
								利用規約
							</a>
							<a href="#" className="hover:underline">
								プライバシーポリシー
							</a>
							<a href="#" className="hover:underline">
								Cookie
							</a>
							<a href="#" className="hover:underline">
								アクセシビリティ
							</a>
							<a href="#" className="hover:underline">
								広告情報
							</a>
							<a href="#" className="hover:underline">
								その他
							</a>
						</nav>
						<p className="mt-2">© 2024 Twitter-like App</p>
					</footer>
				</div>
			</ScrollArea>
		</aside>
	);
}

const suggestedUsers = [
	{
		name: "山田太郎",
		username: "yamada_taro",
		avatarUrl: "",
	},
	{
		name: "佐藤花子",
		username: "sato_hanako",
		avatarUrl: "",
	},
	{
		name: "鈴木一郎",
		username: "suzuki_ichiro",
		avatarUrl: "",
	},
	{
		name: "田中美咲",
		username: "tanaka_misaki",
		avatarUrl: "",
	},
	{
		name: "高橋健太",
		username: "takahashi_kenta",
		avatarUrl: "",
	},
];
