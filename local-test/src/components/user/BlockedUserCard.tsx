import { UserInfo } from "@/types/useInfo";
import Link from "next/link";
import { Button, Card, CardContent } from "../ui";
import { Lock, Shield } from "lucide-react";
import UserAvatar from "./UserAvatar";

interface BlockedUserCardProps {
	user: UserInfo;
	handleUnblock: (userId: string) => void;
}

export default function BlockedUserCard({
	user,
	handleUnblock,
}: BlockedUserCardProps) {
	const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		handleUnblock(user.userId);
	};

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
									<p className="text-sm truncate">
										{user.bio}
									</p>
								</div>
								<Button
									onClick={onClick}
									className="p-4 bg-red-500 hover:bg-red-600"
								>
									ブロック解除
								</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
