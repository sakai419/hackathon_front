import { MediaTypes, TweetInfo } from "@/types/tweetInfo";
import TweetItem from "../TweetItem";
import { useEffect, useState } from "react";

const sampleTweets = [
	{
		TweetId: 1,
		UserInfo: {
			UserId: "1",
			UserName: "田中太郎",
			ProfileImageUrl: "",
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
		TweetId: 2,
		UserInfo: {
			UserId: "2",
			UserName: "山田花子",
			ProfileImageUrl: "",
			IsPrivate: true,
			IsAdmin: false,
		},
		Content: "新しい料理のレシピを試してみました！",
		Media: {
			type: "image" as MediaTypes,
			url: "/images/default_image.png",
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
		TweetId: 3,
		UserInfo: {
			UserId: "3",
			UserName: "鈴木一郎",
			ProfileImageUrl: "",
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
	const [tweetList, setTweets] = useState(tweets);

	const handleLike = (tweetId: number) => {
		setTweets((prevTweets) =>
			prevTweets.map((tweet) =>
				tweet.TweetId === tweetId
					? {
							...tweet,
							HasLiked: !tweet.HasLiked,
							LikesCount: tweet.HasLiked
								? tweet.LikesCount - 1
								: tweet.LikesCount + 1,
					  }
					: tweet
			)
		);
	};

	const handleRetweet = (tweetId: number) => {
		setTweets((prevTweets) =>
			prevTweets.map((tweet) =>
				tweet.TweetId === tweetId
					? {
							...tweet,
							HasRetweeted: !tweet.HasRetweeted,
							RetweetsCount: tweet.HasRetweeted
								? tweet.RetweetsCount - 1
								: tweet.RetweetsCount + 1,
					  }
					: tweet
			)
		);
	};

	return (
		<div className="divide-y divide-gray-200">
			{tweetList.map((tweet, index) => (
				<div key={index} className="flex p-4">
					<TweetItem
						key={tweet.TweetId}
						tweet={tweet}
						onLike={() => handleLike(tweet.TweetId)}
						onRetweet={() => handleRetweet(tweet.TweetId)}
					/>
				</div>
			))}
		</div>
	);
}
