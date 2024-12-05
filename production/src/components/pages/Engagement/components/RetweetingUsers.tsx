import { ErrorMessage, LoadingScreen } from "@/components/common";
import { UserList } from "@/components/user";
import useRetweetingUsers from "@/hooks/useRetweetingUsers";

interface RetweetingUsersProps {
	tweetId: number;
}

export default function RetweetingUsers({ tweetId }: RetweetingUsersProps) {
	const { users, isLoading, hasMore, loadMore, error } = useRetweetingUsers({
		tweetId,
	});

	if (error) {
		return <ErrorMessage error={error} />;
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
							リツイートはまだありません
						</h2>
						他のユーザーのツイートをリツイートして共有しましょう。リツイートするとここに表示されます。
					</div>
				</div>
			)}
		</>
	);
}
