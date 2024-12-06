import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserInfo } from "@/types/useInfo";
import useBlockedUsers from "@/hooks/useBlockedUsers";
import { ErrorMessage } from "@/components/common";
import { BlockedUserCard } from "@/components/user";
import unBlockUser from "@/services/api/block/unBlockUser";

export function BlockedUsers() {
	const [error, setError] = useState<unknown>(null);
	const [blockedUsers, setBlockedUsers] = useState<UserInfo[]>([]);

	const {
		users,
		isLoading,
		hasMore,
		loadMore,
		error: blockedUsersError,
	} = useBlockedUsers();

	useEffect(() => {
		setBlockedUsers(users);
	}, [users]);

	const handleUnblock = async (userId: string) => {
		try {
			await unBlockUser(userId);
			setBlockedUsers(
				blockedUsers.filter((user) => user.userId !== userId)
			);
		} catch (error) {
			setError(error);
		}
	};

	if (error || blockedUsersError) {
		return <ErrorMessage error={error || blockedUsersError} />;
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>ブロックユーザーのリスト</CardTitle>
			</CardHeader>
			<CardContent>
				{blockedUsers.length === 0 ? (
					<p className="text-sm text-muted-foreground">
						ブロックしているユーザーはいません。
					</p>
				) : (
					<>
						<div className="divide-y divide-gray-200">
							{blockedUsers.map((user) => (
								<BlockedUserCard
									key={user.userId}
									user={user}
									handleUnblock={handleUnblock}
								/>
							))}
						</div>
						<Button
							onClick={loadMore}
							disabled={!hasMore}
							className="w-full mt-4"
						>
							{isLoading
								? "読み込み中..."
								: hasMore
								? "さらに表示"
								: "すべて表示"}
						</Button>
					</>
				)}
			</CardContent>
		</Card>
	);
}
