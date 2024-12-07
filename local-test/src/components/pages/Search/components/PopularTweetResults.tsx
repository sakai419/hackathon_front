import { ErrorMessage, LoadingScreen } from "@/components/common";
import { TweetList } from "@/components/tweet";
import { Button } from "@/components/ui";
import usePopularTweetResults from "@/hooks/usePopularTweetResults";

interface LatestTweetResultsProps {
	keyword: string;
	label: string;
}

export default function PopularTweetResults({
	keyword,
	label,
}: LatestTweetResultsProps) {
	const { results, isLoading, hasMore, loadMore, error } =
		usePopularTweetResults({
			keyword,
			label,
		});

	if (error) {
		return <ErrorMessage error={error} />;
	}

	return keyword || label ? (
		<>
			{isLoading && <LoadingScreen />}
			<TweetList tweets={results} highlightWord={keyword} />
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
