import { Card, CardContent } from "@/components/ui";
import { TweetInfo } from "@/types/tweet";
import { useState } from "react";
import TweetContent from "./TweetItem";
import Link from "next/link";
import useClientProfile from "@/hooks/useClientProfile";

interface RelatedTweetCardProps {
	tweet: TweetInfo;
	withActions?: boolean;
}

export default function RelatedTweetCard({
	tweet,
	withActions = false,
}: RelatedTweetCardProps) {
	const [tweetInfo, setTweetInfo] = useState<TweetInfo>(tweet);
	const { profile } = useClientProfile();
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
						<TweetContent
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
