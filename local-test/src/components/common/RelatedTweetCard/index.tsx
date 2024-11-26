import { Card, CardContent } from "@/components/ui/card";
import { TweetInfo } from "@/types/tweetInfo";
import TweetItem from "../TweetItem";
import { useState } from "react";

interface RelatedTweetCardProps {
	tweet: TweetInfo;
}

export default function RelatedTweetCard({ tweet }: RelatedTweetCardProps) {
	const [tweetInfo, setTweetInfo] = useState<TweetInfo>(tweet);
	const updateTweet = (
		tweet: TweetInfo,
		updateFields: Partial<TweetInfo>
	) => {
		setTweetInfo({
			...tweet,
			...updateFields,
		});
	};
	return (
		<Card className="w-full">
			<CardContent className="pt-4">
				<TweetItem tweet={tweetInfo} updateTweet={updateTweet} />
			</CardContent>
		</Card>
	);
}
