import { UserInfo } from "@/types/useInfo";
import Link from "next/link";
import { Button, Card, CardContent } from "../ui";
import { Lock, Shield } from "lucide-react";
import UserAvatar from "./UserAvatar";
import useClientProfile from "@/hooks/useClientProfile";

interface UserCardProps {
	user: UserInfo;
}

export default function UserCard({ user }: UserCardProps) {
	const handleFollowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		console.log("clicked");
	};

	const { profile } = useClientProfile();
	const isClient = profile?.userInfo.userId === user.userId;

	return (
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
								{isClient ? null : (
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
											: user.isPending
											? "リクエスト送信済み"
											: user.isPrivate
											? "リクエストを送る"
											: "フォローする"}
									</Button>
								)}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
