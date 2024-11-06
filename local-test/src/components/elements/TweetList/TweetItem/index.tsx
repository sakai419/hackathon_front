import formatDate from "@/lib/utils/formatDate";
import { MessageCircle, Repeat2, Heart } from "lucide-react";

export interface TweetItemProps {
	content: string;
	repliesCount: number;
	retweetsCount: number;
	likesCount: number;
	createdAt: Date;
}

export default function TweetItem({
	content,
	repliesCount,
	retweetsCount,
	likesCount,
	createdAt,
}: TweetItemProps) {
	return (
		<div className="border-b pb-4 last:border-b-0 last:pb-0">
			<p className="mb-2">{content}</p>
			<div className="flex justify-between items-center text-sm text-muted-foreground">
				<span>{formatDate(createdAt)}</span>
				<div className="flex gap-4">
					<button
						className="flex items-center gap-1"
						aria-label={`返信 ${repliesCount}件`}
					>
						<MessageCircle size={18} />
						<span>{repliesCount}</span>
					</button>
					<button
						className="flex items-center gap-1"
						aria-label={`リツイート ${retweetsCount}件`}
					>
						<Repeat2 size={18} />
						<span>{retweetsCount}</span>
					</button>
					<button
						className="flex items-center gap-1"
						aria-label={`いいね ${likesCount}件`}
					>
						<Heart size={18} />
						<span>{likesCount}</span>
					</button>
				</div>
			</div>
		</div>
	);
}
