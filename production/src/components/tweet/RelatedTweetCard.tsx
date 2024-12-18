import { Card, CardContent } from "@/components/ui";
import { TweetInfo } from "@/types/tweet";
import { useState } from "react";
import Link from "next/link";
import TweetItem from "./TweetItem";
import { useClientProfileContext } from "@/context";

interface RelatedTweetCardProps {
	tweet: TweetInfo;
	withActions?: boolean;
}

export default function RelatedTweetCard({
	tweet,
	withActions = false,
}: RelatedTweetCardProps) {
	const [tweetInfo, setTweetInfo] = useState<TweetInfo>(tweet);
	const { profile } = useClientProfileContext();
	const clientUserId = profile?.userInfo.userId;
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
					{clientUserId && (
						<TweetItem
							tweet={tweetInfo}
							clientUserId={clientUserId}
							withActions={withActions}
							updateTweet={updateTweet}
						/>
					)}
				</CardContent>
			</Card>
		</Link>
	);
}
