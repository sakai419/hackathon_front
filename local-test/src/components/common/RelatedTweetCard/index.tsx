import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TweetInfo } from "@/types/tweetInfo";
import TweetItem from "../TweetItem";

type RelatedTweetCardProps = {
	tweet: TweetInfo;
};

export default function RelatedTweetCard({ tweet }: RelatedTweetCardProps) {
	return (
		<Card className="w-full">
			<CardContent className="pt-4">
				<TweetItem tweet={tweet} />
			</CardContent>
		</Card>
	);
}
