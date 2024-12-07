import { Card, CardContent } from "@/components/ui";
import { UserAvatar } from "@/components/user";
import { UserInfoWithoutBio } from "@/types/userInfoWithoutBio";
import { Lock, Shield } from "lucide-react";
import Link from "next/link";

interface FollowSuggestsCardProps {
	user: UserInfoWithoutBio;
}

export default function FollowSuggestsCard({ user }: FollowSuggestsCardProps) {
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
								<div className="max-w-full">
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
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
