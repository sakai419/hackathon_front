import { ArrowLeft, Lock } from "lucide-react";
import Link from "next/link";

type ProfileHeaderProps = {
	userId: string;
	tweetCount: number;
};

export default function ProfileHeader({
	userId,
	tweetCount,
}: ProfileHeaderProps) {
	return (
		<div className="flex items-center gap-6 p-4 h-14">
			<Link href="/" className="hover:opacity-70">
				<ArrowLeft className="h-5 w-5" />
			</Link>
			<div className="flex flex-col">
				<div className="flex items-center gap-1">
					<span className="font-bold">{userId}</span>
					<Lock className="h-4 w-4" />
				</div>
				<span className="text-sm text-muted-foreground">
					{tweetCount}件のポスト
				</span>
			</div>
		</div>
	);
}
