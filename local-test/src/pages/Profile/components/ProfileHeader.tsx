import Header from "@/components/layouts/Header";
import { Lock } from "lucide-react";

interface ProfileHeaderProps {
	userId: string;
	tweetCount: number;
}

export default function ProfileHeader({
	userId,
	tweetCount,
}: ProfileHeaderProps) {
	return (
		<Header
			title={
				<div className="flex flex-col">
					<div className="flex items-center gap-1">
						<span className="font-bold">{userId}</span>
						<Lock className="h-4 w-4" />
					</div>
					<span className="text-sm text-muted-foreground">
						{tweetCount}件のポスト
					</span>
				</div>
			}
		/>
	);
}
