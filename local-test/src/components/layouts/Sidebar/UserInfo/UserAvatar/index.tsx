import { User } from "@/types/user";
import { LockIcon } from "lucide-react";
import Image from "next/image";

interface UserAvatarProps {
	user: User;
}

export function UserAvatar({ user }: UserAvatarProps) {
	return (
		<div className="flex items-center space-x-3">
			<Image
				src={user?.profileImageUrl || "/default-profile.png"}
				alt={user.name}
				width={40}
				height={40}
				className="rounded-full"
			/>
			<div className="flex-grow text-left">
				<p className="font-bold text-sm">{user.name}</p>
				<p className="text-xs text-gray-500">@{user.id}</p>
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
