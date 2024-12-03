import { LoadingScreen, UserList } from "@/components/common";
import useQuotingUsers from "@/hooks/useQuotingUsers";

interface QuotingUsersProps {
	tweetId: number;
}

export default function QuotingUsers({ tweetId }: QuotingUsersProps) {
	const { users, isLoading, hasMore, loadMore, error } = useQuotingUsers({
		tweetId,
	});

	if (error) {
		return <div>エラーが発生しました</div>;
	}

	return (
		<>
			{isLoading && <LoadingScreen />}
			{users.length !== 0 ? (
				<UserList users={users} hasMore={hasMore} loadMore={loadMore} />
			) : (
				<div className="flex justify-center items-center mt-4">
					<div className="text-center text-gray-500 w-1/2 flex-col justify-center items-center">
						<h2 className="text-xl text-black font-semibold">
							引用はまだありません
						</h2>
						他のユーザーのツイートを引用して共有しましょう。引用するとここに表示されます。
					</div>
				</div>
			)}
		</>
	);
}
