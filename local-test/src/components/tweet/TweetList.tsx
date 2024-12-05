import { TweetInfo, TweetNode } from "@/types/tweet";
import { useState, useEffect } from "react";
import TweetItem from "./TweetItem";
import { useClientProfileContext } from "@/context";

interface TweetListProps {
	tweets: TweetNode[];
	highlightWord?: string;
	disablePin?: boolean;
}

export default function TweetList({
	tweets,
	highlightWord,
	disablePin = true,
}: TweetListProps) {
	const [tweetNodes, setTweetNodes] = useState<TweetNode[]>(tweets);

	useEffect(() => {
		setTweetNodes(tweets);
	}, [tweets]);

	const updateTweet = (
		tweet: TweetInfo,
		updateFields: Partial<TweetInfo>
	) => {
		setTweetNodes((prev) => {
			return prev.map((node) => {
				if (node.tweet.tweetId === tweet.tweetId) {
					return {
						...node,
						tweet: {
							...node.tweet,
							...updateFields,
						},
					};
				}
				return node;
			});
		});
	};

	const { profile } = useClientProfileContext();
	const clientUserId = profile?.userInfo.userId || "";

	return (
		<div className="divide-y divide-gray-200">
			{tweetNodes.map((tweet, index) => (
				<div key={index} className="flex-col p-4">
					{tweet.tweet.isReply && tweet.originalTweet && (
						<TweetItem
							tweet={tweet.originalTweet}
							highlightWord={highlightWord}
							clientUserId={clientUserId}
							updateTweet={updateTweet}
							showThreadLine={true}
						/>
					)}
					{tweet.omittedReplyExist && (
						<div className="flex items-start pt-4 pl-4 w-full">
							<div className="relative w-10 h-4">
								<div className="absolute top-2 left-1/2 w-0.5 h-0.5 bg-gray-400 -translate-x-1/2"></div>
								<div className="absolute top-3 left-1/2 w-0.5 h-0.5 bg-gray-400 -translate-x-1/2"></div>
								<div className="absolute top-4 left-1/2 w-0.5 h-0.5 bg-gray-400 -translate-x-1/2"></div>
								<div className="absolute top-5 left-1/2 w-0.5 h-0.5 bg-gray-400 -translate-x-1/2"></div>
								<div className="absolute top-6 left-1/2 w-0.5 h-0.5 bg-gray-400 -translate-x-1/2"></div>
							</div>
						</div>
					)}
					{tweet.parentReply && (
						<TweetItem
							tweet={tweet.parentReply}
							highlightWord={highlightWord}
							clientUserId={clientUserId}
							updateTweet={updateTweet}
							showThreadLine={true}
						/>
					)}
					<TweetItem
						tweet={tweet.tweet}
						highlightWord={highlightWord}
						clientUserId={clientUserId}
						updateTweet={updateTweet}
						disbalePin={disablePin}
						{...(tweet.tweet.isQuote && {
							quotedTweet: tweet.originalTweet,
						})}
					/>
				</div>
			))}
		</div>
	);
}
