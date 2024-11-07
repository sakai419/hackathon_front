// UserInfo.tsx
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "./UserAvatar";
import { PopoverLogoutContent } from "./PopoverLogoutContent";
import { UserWithoutBio } from "@/types/userWithoutBio";

interface UserInfoProps {
	user: UserWithoutBio;
}

export default function UserInfo({ user }: UserInfoProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" className="w-full justify-start p-8">
					<UserAvatar user={user} />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-4 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)]">
				<PopoverLogoutContent userId={user.userId} />
			</PopoverContent>
		</Popover>
	);
}
