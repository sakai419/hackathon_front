import { ErrorMessage, LoadingScreen } from "@/components/common";
import { UserList } from "@/components/user";
import useFollowers from "@/hooks/useFollowers";

interface FollowersProps {
	userId: string;
}

export default function Followers({ userId }: FollowersProps) {
	const { users, isLoading, hasMore, loadMore, error } = useFollowers({
		userId,
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
							フォロワーはまだいません
						</h2>
						他のユーザーにフォローされるとここに表示されます。
					</div>
				</div>
			)}
		</>
	);
}
