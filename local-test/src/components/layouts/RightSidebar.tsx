import React from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Hash, User } from "lucide-react";

export default function RightSidebar() {
	return (
		<aside className="w-80 hidden lg:flex flex-col h-[calc(100vh-3.5rem)] sticky top-0 right-0 border-x-2">
			<div className="p-4 bg-background">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
					<Input
						type="search"
						placeholder="検索"
						className="pl-10 bg-muted"
					/>
				</div>
			</div>

			<ScrollArea className="flex-grow">
				<div className="p-4 space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>トレンド</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{trends.map((trend, index) => (
								<div key={index} className="space-y-1">
									<div className="flex items-center text-sm text-muted-foreground">
										<Hash className="w-4 h-4 mr-1" />
										<span>{trend.category}</span>
									</div>
									<p className="font-semibold">
										{trend.title}
									</p>
									<p className="text-sm text-muted-foreground">
										{trend.tweetCount}件のツイート
									</p>
								</div>
							))}
						</CardContent>
					</Card>

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

const trends = [
	{ category: "テクノロジー", title: "React 19", tweetCount: "2,500" },
	{ category: "ポリティクス", title: "参議院選挙", tweetCount: "5,200" },
	{ category: "スポーツ", title: "東京オリンピック", tweetCount: "12,800" },
	{
		category: "エンターテイメント",
		title: "新作映画公開",
		tweetCount: "3,100",
	},
	{
		category: "ビジネス",
		title: "新型コロナウイルス経済対策",
		tweetCount: "7,600",
	},
	{ category: "科学", title: "火星探査ミッション", tweetCount: "4,300" },
	{ category: "教育", title: "オンライン授業の未来", tweetCount: "3,800" },
	{ category: "健康", title: "新しい健康トレンド", tweetCount: "5,900" },
];

const suggestedUsers = [
	{
		name: "山田太郎",
		username: "yamada_taro",
		avatarUrl: "/placeholder.svg?height=40&width=40",
	},
	{
		name: "佐藤花子",
		username: "sato_hanako",
		avatarUrl: "/placeholder.svg?height=40&width=40",
	},
	{
		name: "鈴木一郎",
		username: "suzuki_ichiro",
		avatarUrl: "/placeholder.svg?height=40&width=40",
	},
	{
		name: "田中美咲",
		username: "tanaka_misaki",
		avatarUrl: "/placeholder.svg?height=40&width=40",
	},
	{
		name: "高橋健太",
		username: "takahashi_kenta",
		avatarUrl: "/placeholder.svg?height=40&width=40",
	},
];
