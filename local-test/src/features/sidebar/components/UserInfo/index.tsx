import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { PopoverLogoutContent } from "./PopoverLogoutContent";
import { UserInfoWithoutBio } from "@/types/userInfoWithoutBio";
import UserAvatar from "@/components/elements/UserAvatar";
import { LockIcon, Shield } from "lucide-react";

interface UserInfoProps {
	user: UserInfoWithoutBio;
}

export default function UserInfo({ user }: UserInfoProps) {
	const profileImage = user.ProfileImageUrl || "/images/default_image.png";

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" className="w-full justify-start p-8">
					<UserAvatar
						withLink={false}
						userId={user.UserId}
						src={profileImage}
						alt={user.UserName}
						size="md"
					/>
					{user.IsPrivate && (
						<LockIcon
							className="w-4 h-4 text-gray-500"
							aria-label="非公開アカウント"
						/>
					)}
					{user.IsAdmin && (
						<Shield
							className="w-4 h-4 text-blue-500"
							aria-label="管理者"
						/>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-4 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)]">
				<PopoverLogoutContent userId={user.UserId} />
			</PopoverContent>
		</Popover>
	);
}
