import { LoadingScreen } from "@/components/common";
import { TweetList } from "@/components/tweet";
import { Button } from "@/components/ui";
import useLatestTweetResults from "@/hooks/useLatestTweetResults";

interface LatestTweetResultsProps {
	keyword: string;
}

export default function LatestTweetResults({
	keyword,
}: LatestTweetResultsProps) {
	const { results, isLoading, hasMore, loadMore, error } =
		useLatestTweetResults({
			keyword,
		});

	if (error) {
		return <div>エラーが発生しました</div>;
	}

	return keyword ? (
		<>
			{isLoading && <LoadingScreen />}
			<TweetList tweets={results} />
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
