import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Repeat, Pin, Lock, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TweetInfo } from "@/types/tweetInfo";
import { getRelativeTimeString } from "@/lib/utils/getRelativeTimeString";
import UserAvatar from "../UserAvatar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type TweetItemProps = {
	tweet: TweetInfo;
	onLike: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onRetweet: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function TweetItem({
	tweet,
	onLike,
	onRetweet,
}: TweetItemProps) {
	const router = useRouter();
	const tweetDate = new Date(tweet.CreatedAt);
	const relativeTime = getRelativeTimeString(tweetDate);
	const profileImage =
		tweet.UserInfo.ProfileImageUrl || "/images/default_image.png";

	const handleUserNameCLick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		router.push(`/${tweet.UserInfo.UserId}`);
	};

	return (
		<Link href={`/tweets/${tweet.TweetId}`} className="w-full">
			<div className="flex items-start space-x-2">
				<UserAvatar
					userId={tweet.UserInfo.UserId}
					src={profileImage}
					alt={tweet.UserInfo?.UserName}
				></UserAvatar>
				<div className="flex-1">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<span
								className="font-semibold hover:underline"
								onClick={handleUserNameCLick}
							>
								{tweet.UserInfo.UserName}
							</span>
							{tweet.UserInfo.IsPrivate && (
								<Lock
									className="w-4 h-4 text-gray-500"
									aria-label="非公開アカウント"
								/>
							)}
							{tweet.UserInfo.IsAdmin && (
								<Shield
									className="w-4 h-4 text-blue-500"
									aria-label="管理者"
								/>
							)}
							<span className="text-gray-500">
								@{tweet.UserInfo.UserId + "・" + relativeTime}
							</span>
						</div>
						{tweet.IsPinned && (
							<Badge
								variant="outline"
								className="flex items-center"
							>
								<Pin className="w-4 h-4 mr-1" />
								ピン留め
							</Badge>
						)}
					</div>
					<div className="mt-2">
						{tweet.Content && (
							<p className="mb-2">{tweet.Content}</p>
						)}
						{tweet.Code && (
							<pre className="bg-gray-100 p-2 rounded-md overflow-x-auto">
								<code>{tweet.Code}</code>
							</pre>
						)}
						{tweet.Media && tweet.Media.type === "image" && (
							<Image
								src={tweet.Media.url}
								alt="ツイートの画像"
								width={500}
								height={300}
								className="rounded-md mt-2 object-cover"
							/>
						)}
					</div>
					<div className="flex justify-between text-gray-500 mt-4">
						<Button
							variant="ghost"
							size="sm"
							className="flex items-center space-x-2 hover:bg-sky-100 hover:text-sky-500"
						>
							<MessageCircle className="w-4 h-4" />
							<span>{tweet.RepliesCount}</span>
							<span className="sr-only">返信</span>
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={onRetweet}
							className={`flex items-center space-x-2 hover:bg-green-100 hover:text-green-500 ${
								tweet.HasRetweeted ? "text-green-500" : ""
							}`}
						>
							<Repeat className="w-4 h-4 hover:bg-green-300" />
							<span>{tweet.RetweetsCount}</span>
							<span className="sr-only">リツイート</span>
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={onLike}
							className={`flex items-center space-x-2 hover:bg-red-100 hover:text-red-500 ${
								tweet.HasLiked ? "text-red-500" : ""
							}`}
							aria-label={
								tweet.HasLiked
									? "いいねを取り消す"
									: "いいねする"
							}
						>
							<Heart
								className="w-4 h-4"
								fill={tweet.HasLiked ? "currentColor" : "none"}
								stroke={
									tweet.HasLiked ? "none" : "currentColor"
								}
							/>
							<span>{tweet.LikesCount}</span>
							<span className="sr-only">いいね</span>
						</Button>
					</div>
				</div>
			</div>
		</Link>
	);
}
