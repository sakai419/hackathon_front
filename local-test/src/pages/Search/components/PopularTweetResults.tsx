import { LoadingScreen } from "@/components/common";
import { TweetList } from "@/components/tweet";
import { Button } from "@/components/ui";
import usePopularTweetResults from "@/hooks/usePopularTweetResults";

interface LatestTweetResultsProps {
	keyword: string;
}

export default function PopularTweetResults({
	keyword,
}: LatestTweetResultsProps) {
	const { results, isLoading, hasMore, loadMore, error } =
		usePopularTweetResults({
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
