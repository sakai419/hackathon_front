import { UserInfo } from "@/types/useInfo";
import { Button } from "../ui";
import UserCard from "./UserCard";

interface UserListProps {
	users: UserInfo[];
	hasMore: boolean;
	loadMore: () => void;
}

export default function UserList({ users, hasMore, loadMore }: UserListProps) {
	return (
		<div className="divide-y divide-gray-200">
			{users.map((user) => (
				<UserCard key={user.userId} user={user} />
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
