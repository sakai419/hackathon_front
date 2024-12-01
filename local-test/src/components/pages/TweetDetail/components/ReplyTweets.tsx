import { TweetItem } from "@/components/tweet";
import useClientProfile from "@/hooks/useClientProfile";
import { TweetInfo } from "@/types/tweet";
import { useEffect, useState } from "react";

interface ReplyTweetsProps {
	replies: TweetInfo[];
}

export default function ReplyTweets({ replies }: ReplyTweetsProps) {
	const [replyTweets, setReplyTweets] = useState<TweetInfo[]>([]);

	const { profile } = useClientProfile();
	const clientUserId = profile?.userInfo.userId;

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
