import { UserInfo } from "@/types/useInfo";
import Link from "next/link";
import { Button, Card, CardContent } from "../ui";
import { Lock, Shield, UserCheck } from "lucide-react";
import UserAvatar from "./UserAvatar";

interface UserListProps {
	users: UserInfo[];
	hasMore: boolean;
	loadMore: () => void;
}

export default function UserList({ users, hasMore, loadMore }: UserListProps) {
	const handleFollowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.currentTarget.textContent === "フォローする") {
			e.currentTarget.textContent = "フォロー中";
		} else {
			e.currentTarget.textContent = "フォローする";
		}
	};
	return (
		<div className="divide-y divide-gray-200">
			{users.map((user) => (
				<Link
					href={`/users/${user.userId}`}
					className="block"
					key={user.userId}
				>
					<Card className="hover:bg-accent transition-colors">
						<CardContent className="p-4">
							<div className="flex items-start space-x-4">
								<UserAvatar
									withLink={false}
									userId={user.userId}
									src={user.profileImageUrl}
									alt={`${user.userName}'s avatar`}
									size="w-12 h-12"
								/>
								<div className="flex-1 min-w-0">
									<div className="flex items-center justify-between">
										<div>
											<div className="flex items-center space-x-2">
												<h3 className="text-sm font-semibold truncate">
													{user.userName}
												</h3>
												{user.isPrivate && (
													<Lock
														className="w-4 h-4 text-gray-500"
														aria-label="Private account"
													/>
												)}
												{user.isAdmin && (
													<Shield
														className="w-4 h-4 text-blue-500"
														aria-label="Admin account"
													/>
												)}
											</div>
											<p className="text-sm text-gray-500 truncate">
												@{user.userId}
											</p>
										</div>
										<Button
											variant={
												user.isFollowing
													? "secondary"
													: "default"
											}
											size="sm"
											className={`rounded-full px-4 ${
												user.isFollowing
													? "hover:bg-red-100 hover:text-red-600 hover:border-red-600"
													: ""
											}`}
											onClick={handleFollowClick}
										>
											{user.isFollowing
												? "フォロー中"
												: "フォローする"}
										</Button>
									</div>
									<p className="text-sm text-gray-700 mt-1 line-clamp-2">
										{user.bio}
									</p>
									{user.isFollowed && (
										<div className="flex items-center mt-2 text-sm text-gray-500">
											<UserCheck className="w-4 h-4 mr-1" />
											フォローされています
										</div>
									)}
								</div>
							</div>
						</CardContent>
					</Card>
				</Link>
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
