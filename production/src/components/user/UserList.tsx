import { UserInfo } from "@/types/useInfo";
import { Button } from "../ui";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";

interface UserListProps {
	users: UserInfo[];
	hasMore: boolean;
	loadMore: () => void;
}

export default function UserList({ users, hasMore, loadMore }: UserListProps) {
	const [userList, setUserList] = useState<UserInfo[]>(users);

	useEffect(() => {
		setUserList(users);
	}, [users]);

	const updateUser = (user: UserInfo, updateFields: Partial<UserInfo>) => {
		setUserList((prev) =>
			prev.map((u) =>
				u.userId === user.userId ? { ...u, ...updateFields } : u
			)
		);
	};

	return (
		<div className="divide-y divide-gray-200">
			{userList.map((user) => (
				<UserCard
					key={user.userId}
					user={user}
					updateUser={updateUser}
				/>
			))}
			<Button
				onClick={loadMore}
				disabled={!hasMore}
				className="w-full mt-4"
			>
				{hasMore ? "さらに読み込む" : "検索結果は以上です"}
			</Button>
		</div>
	);
}
