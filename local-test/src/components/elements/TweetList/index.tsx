import { TweetInfo } from "@/types/tweetInfo";
import TweetItem from "./TweetItem";
import { useEffect } from "react";

const sampleTweets = [
	{
		TweetID: 1,
		UserInfo: {
			UserId: "1",
			UserName: "田中太郎",
			ProfileImageUrl: "/placeholder.svg?height=400&width=400",
			IsPrivate: false,
			IsAdmin: true,
		},
		Content: "今日は晴れですね！散歩に行ってきます。",
		LikesCount: 15,
		RetweetsCount: 3,
		RepliesCount: 2,
		IsQuote: false,
		IsReply: false,
		IsPinned: true,
		HasLiked: true,
		HasRetweeted: false,
		CreatedAt: "2023-06-15T09:00:00Z",
	},
	{
		TweetID: 2,
		UserInfo: {
			UserId: "2",
			UserName: "山田花子",
			ProfileImageUrl: "/placeholder.svg?height=400&width=400",
			IsPrivate: true,
			IsAdmin: false,
		},
		Content: "新しい料理のレシピを試してみました！",
		Media: {
			type: "image",
			url: "/placeholder.svg?height=300&width=500",
		},
		LikesCount: 30,
		RetweetsCount: 5,
		RepliesCount: 8,
		IsQuote: false,
		IsReply: false,
		IsPinned: false,
		HasLiked: false,
		HasRetweeted: true,
		CreatedAt: "2023-06-15T10:30:00Z",
	},
	{
		TweetID: 3,
		UserInfo: {
			UserId: "3",
			UserName: "鈴木一郎",
			ProfileImageUrl: "/placeholder.svg?height=400&width=400",
			IsPrivate: false,
			IsAdmin: false,
		},
		Content: "今日のコーディング課題：",
		Code: "function hello() {\n  console.log('Hello, World!');\n}",
		LikesCount: 20,
		RetweetsCount: 7,
		RepliesCount: 5,
		IsQuote: false,
		IsReply: true,
		IsPinned: false,
		HasLiked: false,
		HasRetweeted: false,
		CreatedAt: "2023-06-15T11:45:00Z",
	},
];

export function TweetListExample() {
	useEffect(() => {
		console.log("TweetListExample rendered");
	}, []);
	return <TweetList tweets={sampleTweets} />;
}

export default function TweetList({ tweets }: { tweets: TweetInfo[] }) {
	return (
		<div className="divide-y divide-gray-200">
			{tweets.map((tweet, index) => (
				<TweetItem key={tweet.TweetID} tweet={tweet} />
			))}
		</div>
	);
}
