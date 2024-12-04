import { LoadingScreen } from "@/components/common";
import { UserList } from "@/components/user";
import useLikingUsers from "@/hooks/useLinkingUsers";

interface LikingUsersProps {
	tweetId: number;
}

export default function LikingUsers({ tweetId }: LikingUsersProps) {
	const { users, isLoading, hasMore, loadMore, error } = useLikingUsers({
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
							いいねはまだありません
						</h2>
						他のユーザーのツイートをいいねして共有しましょう。いいねするとここに表示されます。
					</div>
				</div>
			)}
		</>
	);
}
