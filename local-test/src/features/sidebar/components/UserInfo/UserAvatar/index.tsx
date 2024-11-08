import { UserInfoWithoutBio } from "@/types/userInfoWithoutBio";
import { LockIcon } from "lucide-react";
import Image from "next/image";

interface UserAvatarProps {
	user: UserInfoWithoutBio;
}

export function UserAvatar({ user }: UserAvatarProps) {
	const profileImageUrl = user.ProfileImageUrl || "/images/default_image.png";

	return (
		<div className="flex items-center space-x-3">
			<Image
				src={profileImageUrl}
				alt={user.UserName}
				width={40}
				height={40}
				className="rounded-full"
			/>
			<div className="flex-grow text-left">
				<p className="font-bold text-sm">{user.UserName}</p>
				<p className="text-xs text-gray-500">@{user.UserId}</p>
			</div>
			{user.IsPrivate && (
				<LockIcon
					className="h-4 w-4 text-gray-500"
					aria-label="非公開アカウント"
				/>
			)}
		</div>
	);
}
