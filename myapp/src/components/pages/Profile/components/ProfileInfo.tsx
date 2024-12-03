import { Calendar, Lock } from "lucide-react";

interface ProfileInfoProps {
	userId: string;
	userName: string;
	followingCount: number;
	followerCount: number;
	bio: string;
	date: string;
	isPrivate: boolean;
}

export default function ProfileInfo({
	userId,
	userName,
	followingCount,
	followerCount,
	bio,
	date,
	isPrivate,
}: ProfileInfoProps) {
	return (
		<div className="mt-14 px-4 space-y-3">
			<div>
				<div className="flex items-center gap-1">
					<span className="text-xl font-bold">{userName}</span>
					{isPrivate && <Lock className="w-4 h-4 text-primary" />}
				</div>
				<div className="text-muted-foreground">@{userId}</div>
			</div>

			{bio && <div>{bio}</div>}

			<div className="flex items-center gap-2 text-muted-foreground">
				<Calendar className="h-4 w-4" />
				<span>{date}からTwitterを利用しています</span>
			</div>

			<div className="flex gap-4 text-sm">
				<div>
					<span className="font-bold text-foreground">
						{followingCount}
					</span>
					<span className="text-muted-foreground ml-1">
						フォロー中
					</span>
				</div>
				<div>
					<span className="font-bold text-foreground">
						{followerCount}
					</span>
					<span className="text-muted-foreground ml-1">
						フォロワー
					</span>
				</div>
			</div>
		</div>
	);
}
