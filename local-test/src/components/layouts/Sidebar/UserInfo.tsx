import { Button } from "@/components/ui/button";
import { User } from "@/types/User";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@radix-ui/react-popover";
import { LockIcon } from "lucide-react";
import Image from "next/image";

interface UserInfoProps {
	user: User;
}

export default function UserInfo({ user }: UserInfoProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" className="w-full justify-start p-8">
					<div className="flex items-center space-x-3">
						<Image
							src={user.profileImage}
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
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-4 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)]">
				<div className="text-base font-bold">
					@{user.id}からログアウト
				</div>
			</PopoverContent>
		</Popover>
	);
}
