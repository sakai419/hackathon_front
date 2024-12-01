import { Card, CardContent } from "@/components/ui";
import { TweetInfo } from "@/types/tweet";
import { useState } from "react";
import TweetContent from "./TweetItem";
import Link from "next/link";

interface RelatedTweetCardProps {
	tweet: TweetInfo;
	withActions?: boolean;
}

export default function RelatedTweetCard({
	tweet,
	withActions = false,
}: RelatedTweetCardProps) {
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
		<Link href={`/tweets/${tweetInfo.tweetId}`}>
			<Card className="w-full p-0">
				<CardContent className="pt-4">
					<TweetContent
						tweet={tweetInfo}
						withActions={withActions}
						updateTweet={updateTweet}
					/>
				</CardContent>
			</Card>
		</Link>
	);
}
