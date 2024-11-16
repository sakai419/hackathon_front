import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TweetInfo } from "@/types/tweetInfo";
import TweetItem from "../TweetItem";

type RelatedTweetCardProps = {
	tweet: TweetInfo;
};

export default function RelatedTweetCard({ tweet }: RelatedTweetCardProps) {
	return (
		<Card className="w-full">
			<CardContent className="pt-4 p-4">
				<TweetItem
					tweet={tweet}
					onLike={function (e): void {
						e.stopPropagation();
						throw new Error("Function not implemented.");
					}}
					onRetweet={function (): void {
						throw new Error("Function not implemented.");
					}}
				/>
			</CardContent>
		</Card>
	);
}
