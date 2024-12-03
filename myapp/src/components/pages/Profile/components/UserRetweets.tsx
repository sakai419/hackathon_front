import { LoadingScreen } from "@/components/common";
import { TweetList } from "@/components/tweet";
import { Button } from "@/components/ui";
import useUserRetweets from "@/hooks/useUserRetweets";

interface UserRetweetsProps {
	userId: string;
}

export default function UserRetweets({ userId }: UserRetweetsProps) {
	const { retweets, isLoading, hasMore, loadMore, error } = useUserRetweets({
		userId,
	});

	if (error) {
		return <div>エラーが発生しました</div>;
	}

	return (
		<>
			{isLoading && <LoadingScreen />}
			<div className="max-w-2xl mx-auto">
				<TweetList tweets={retweets} />
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
