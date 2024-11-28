import TweetItem from "@/components/common/TweetList/components/TweetItem";
import { TweetInfo } from "@/types/tweet";
import { useEffect, useState } from "react";

interface ReplyTweetsProps {
	replies: TweetInfo[];
}

export default function ReplyTweets({ replies }: ReplyTweetsProps) {
	const [replyTweets, setReplyTweets] = useState<TweetInfo[]>([]);

	// Set initial reply tweets
	useEffect(() => {
		console.log(replies);
		setReplyTweets(replies);
	}, [replies]);

	const updateTweet = (
		tweet: TweetInfo,
		updateFields: Partial<TweetInfo>
	) => {
		setReplyTweets((prevTweets) =>
			prevTweets.map((prevTweet) =>
				prevTweet.tweetId === tweet.tweetId
					? { ...prevTweet, ...updateFields }
					: prevTweet
			)
		);
	};

	return (
		<div className="divide-y">
			{replyTweets.map((reply) => (
				<TweetItem
					key={reply.tweetId}
					tweet={reply}
					updateTweet={updateTweet}
				/>
			))}
		</div>
	);
}
