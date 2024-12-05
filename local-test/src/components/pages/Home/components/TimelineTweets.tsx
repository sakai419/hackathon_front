import { ErrorMessage, LoadingScreen } from "@/components/common";
import { TweetList } from "@/components/tweet";
import { Button } from "@/components/ui";
import useTimelineTweets from "@/hooks/useTimelineTweets";

export default function TimelineTweets() {
	const { tweets, isLoading, hasMore, loadMore, error } = useTimelineTweets();

	if (error) {
		return <ErrorMessage error={error} />;
	}

	return (
		<>
			{isLoading && <LoadingScreen />}
			<div className="max-w-2xl mx-auto">
				<TweetList tweets={tweets} />
				<Button
					onClick={loadMore}
					disabled={!hasMore}
					className="w-full"
				>
					{hasMore ? "さらに読み込む" : "読み込み完了"}
				</Button>
			</div>
		</>
	);
}
