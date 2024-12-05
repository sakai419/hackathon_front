import { ErrorMessage, LoadingScreen } from "@/components/common";
import { UserList } from "@/components/user";
import useFollowingUsers from "@/hooks/useFollowingUsers";

interface FollowingUsersProps {
	userId: string;
}

export default function FollowingUsers({ userId }: FollowingUsersProps) {
	const { users, isLoading, hasMore, loadMore, error } = useFollowingUsers({
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
							フォローしているユーザーはまだいません
						</h2>
						他のユーザーをフォローしましょう。フォローするとここに表示されます。
					</div>
				</div>
			)}
		</>
	);
}
