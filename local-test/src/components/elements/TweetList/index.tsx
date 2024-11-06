import TweetItem, { TweetItemProps } from "./TweetItem";

interface TweetListProps {
	tweets: TweetItemProps[];
}

export default function TweetList({ tweets }: TweetListProps) {
	return (
		<div className="space-y-4">
			{tweets.map((tweet, index) => (
				<TweetItem key={index} {...tweet} />
			))}
		</div>
	);
}
