import { UserWithoutBio } from "@/types/userWithoutBio";
import { LockIcon } from "lucide-react";
import Image from "next/image";

interface UserAvatarProps {
	user: UserWithoutBio;
}

export function UserAvatar({ user }: UserAvatarProps) {
	const profileImageUrl =
		user.profileImageUrl || "/images/default_profile_image.png";

	return (
		<div className="flex items-center space-x-3">
			<Image
				src={profileImageUrl}
				alt={user.userName}
				width={40}
				height={40}
				className="rounded-full"
			/>
			<div className="flex-grow text-left">
				<p className="font-bold text-sm">{user.userName}</p>
				<p className="text-xs text-gray-500">@{user.userId}</p>
			</div>
			{user.isPrivate && (
				<LockIcon
					className="h-4 w-4 text-gray-500"
					aria-label="非公開アカウント"
				/>
			)}
		</div>
	);
}
