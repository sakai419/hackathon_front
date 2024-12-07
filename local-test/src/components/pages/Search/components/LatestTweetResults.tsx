import { ErrorMessage, LoadingScreen } from "@/components/common";
import { TweetList } from "@/components/tweet";
import { Button } from "@/components/ui";
import useLatestTweetResults from "@/hooks/useLatestTweetResults";

interface LatestTweetResultsProps {
	keyword: string;
	label: string;
	hashtag: string;
}

export default function LatestTweetResults({
	keyword,
	label,
	hashtag,
}: LatestTweetResultsProps) {
	const { results, isLoading, hasMore, loadMore, error } =
		useLatestTweetResults({
			keyword,
			label,
			hashtag,
		});

	if (error) {
		return <ErrorMessage error={error} />;
	}

	return keyword || label || hashtag ? (
		<>
			{isLoading && <LoadingScreen />}
			<TweetList tweets={results} highlightWord={keyword || hashtag} />
			<Button
				onClick={loadMore}
				disabled={!hasMore}
				className="w-full mt-4"
			>
				{hasMore ? "さらに読み込む" : "検索結果は以上です"}
			</Button>
		</>
	) : (
		<div className="text-center text-gray-500">
			キーワードを入力してください
		</div>
	);
}
