import { Card, CardContent } from "@/components/ui/card";
import { TweetInfo } from "@/types/tweetInfo";
import { useState } from "react";
import TweetContent from "../TweetContent";
import TweetActions from "../TweetActions";

interface RelatedTweetCardProps {
	tweet: TweetInfo;
	withActions?: boolean;
}

export default function RelatedTweetCard({
	tweet,
	withActions,
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
		<Card className="w-full">
			<CardContent className="pt-4">
				<TweetContent
					tweet={tweetInfo}
					tweetActions={
						withActions ? (
							<TweetActions
								tweet={tweetInfo}
								updateTweet={updateTweet}
							/>
						) : null
					}
				/>
			</CardContent>
		</Card>
	);
}
