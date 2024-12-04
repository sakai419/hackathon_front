import { TweetItem } from "@/components/tweet";
import { useClientProfileContext } from "@/context";
import { TweetInfo } from "@/types/tweet";
import { useEffect, useState } from "react";

interface ReplyTweetsProps {
	replies: TweetInfo[];
}

export default function ReplyTweets({ replies }: ReplyTweetsProps) {
	const [replyTweets, setReplyTweets] = useState<TweetInfo[]>([]);

	const { profile } = useClientProfileContext();
	const clientUserId = profile?.userInfo.userId;

	// Set initial reply tweets
	useEffect(() => {
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
		<>
			{clientUserId && (
				<div className="divide-y">
					{replyTweets.map((reply) => (
						<TweetItem
							clientUserId={clientUserId}
							key={reply.tweetId}
							tweet={reply}
							updateTweet={updateTweet}
						/>
					))}
				</div>
			)}
		</>
	);
}
