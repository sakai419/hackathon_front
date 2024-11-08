import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Repeat, Pin, Lock, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TweetInfo } from "@/types/tweetInfo";

export default function Tweet({ tweet }: { tweet: TweetInfo }) {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleString("ja-JP", { month: "short", day: "numeric" });
	};

	return (
		<div className="w-full border-t border-b border-gray-200 py-4">
			<div className="flex items-start space-x-4 pb-2">
				<Avatar className="w-12 h-12">
					<AvatarImage
						src={tweet.UserInfo.ProfileImageUrl}
						alt={tweet.UserInfo.UserName}
					/>
					<AvatarFallback>
						{tweet.UserInfo.UserName[0]}
					</AvatarFallback>
				</Avatar>
				<div className="flex-1">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<Link
								href={`/${tweet.UserInfo.UserName}`}
								className="font-semibold hover:underline"
							>
								{tweet.UserInfo.UserName}
							</Link>
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
					{tweet.IsReply && (
						<span className="text-gray-500 text-sm">返信先</span>
					)}
				</div>
			</div>
			<div className="mt-2">
				{tweet.Content && <p className="mb-2">{tweet.Content}</p>}
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
				<p className="text-gray-500 mt-2 text-sm">
					<time dateTime={tweet.CreatedAt}>
						{formatDate(tweet.CreatedAt)}
					</time>
				</p>
			</div>
			<div className="flex justify-between text-gray-500 mt-4">
				<Button
					variant="ghost"
					size="sm"
					className="flex items-center space-x-2"
				>
					<MessageCircle className="w-4 h-4" />
					<span>{tweet.RepliesCount}</span>
					<span className="sr-only">返信</span>
				</Button>
				<Button
					variant="ghost"
					size="sm"
					className={`flex items-center space-x-2 ${
						tweet.HasRetweeted ? "text-green-500" : ""
					}`}
				>
					<Repeat className="w-4 h-4" />
					<span>{tweet.RetweetsCount}</span>
					<span className="sr-only">リツイート</span>
				</Button>
				<Button
					variant="ghost"
					size="sm"
					className={`flex items-center space-x-2 ${
						tweet.HasLiked ? "text-red-500" : ""
					}`}
				>
					<Heart className="w-4 h-4" />
					<span>{tweet.LikesCount}</span>
					<span className="sr-only">いいね</span>
				</Button>
			</div>
		</div>
	);
}
