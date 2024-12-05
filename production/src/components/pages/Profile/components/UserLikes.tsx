import { ErrorMessage, LoadingScreen } from "@/components/common";
import { TweetList } from "@/components/tweet";
import { Button } from "@/components/ui";
import useUserLikes from "@/hooks/useUserLikes";

interface UserLikesProps {
	userId: string;
}

export default function UserLikes({ userId }: UserLikesProps) {
	const { likes, isLoading, hasMore, loadMore, error } = useUserLikes({
		userId,
	});

	if (error) {
		return <ErrorMessage error={error} />;
	}

	return (
		<>
			{isLoading && <LoadingScreen />}
			<div className="max-w-2xl mx-auto">
				<TweetList tweets={likes} />
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
