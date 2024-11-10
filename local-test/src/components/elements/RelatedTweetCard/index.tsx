import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Repeat } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TweetInfo } from "@/types/tweetInfo";
import { getRelativeTimeString } from "@/lib/utils/getRelativeTimeString";
import UserAvatar from "../UserAvatar";

type RelatedTweetCardProps = {
	tweet: TweetInfo;
};

export default function RelatedTweetCard({ tweet }: RelatedTweetCardProps) {
	const tweetDate = new Date(tweet.CreatedAt);
	const relativeTime = getRelativeTimeString(tweetDate);
	const profileImage =
		tweet.UserInfo.ProfileImageUrl || "/images/default_image.png";

	return (
		<Link href={`/tweets/${tweet.TweetID}`}>
			<Card
				className={`w-full ${
					tweet.IsQuote ? "border border-gray-200" : ""
				}`}
			>
				<CardContent className="pt-4">
					<div className="flex items-start space-x-3">
						<UserAvatar
							withLink={false}
							userId={tweet.UserInfo.UserId}
							src={profileImage}
							alt={tweet.UserInfo?.UserName}
						/>
						<div className="flex-1 min-w-0">
							<div className="flex items-center space-x-2">
								<span className="font-semibold truncate">
									{tweet.UserInfo.UserName}
								</span>
								<span className="text-gray-500">
									@{tweet.UserInfo.UserId}
								</span>
								<span className="text-gray-500 text-sm">
									{relativeTime}
								</span>
							</div>
							{tweet.Content && (
								<p className="mt-1 text-sm text-gray-800 break-words">
									{tweet.Content}
								</p>
							)}
							{tweet.Media && tweet.Media.type === "image" && (
								<div className="mt-2 rounded-md overflow-hidden">
									<Image
										src={tweet.Media.url}
										alt="ツイートの画像"
										width={500}
										height={300}
										className="object-cover w-full h-auto"
									/>
								</div>
							)}
						</div>
					</div>
				</CardContent>
				{tweet.IsQuote && (
					<CardFooter className="flex justify-between text-gray-500 pt-2 pb-2">
						<Button
							variant="ghost"
							size="sm"
							className="flex items-center space-x-1 hover:text-sky-500"
						>
							<MessageCircle className="w-4 h-4" />
							<span className="text-xs">
								{tweet.RepliesCount}
							</span>
						</Button>
						<Button
							variant="ghost"
							size="sm"
							className="flex items-center space-x-1 hover:text-green-500"
						>
							<Repeat className="w-4 h-4" />
							<span className="text-xs">
								{tweet.RetweetsCount}
							</span>
						</Button>
						<Button
							variant="ghost"
							size="sm"
							className="flex items-center space-x-1 hover:text-red-500"
						>
							<Heart
								className="w-4 h-4"
								fill={tweet.HasLiked ? "currentColor" : "none"}
							/>
							<span className="text-xs">{tweet.LikesCount}</span>
						</Button>
					</CardFooter>
				)}
			</Card>
		</Link>
	);
}
