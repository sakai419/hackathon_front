import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Repeat, Pin, Lock, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TweetInfo } from "@/types/tweetInfo";
import { getRelativeTimeString } from "@/lib/utils/getRelativeTimeString";
import UserAvatar from "../UserAvatar";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import HashtagHighlighter from "../HashTagHighlighter";
import CodeEditor from "../CodeEditor";

type TweetItemProps = {
	tweet: TweetInfo;
	showThreadLine?: boolean;
};

export default function TweetItem({
	tweet,
	showThreadLine = false,
}: TweetItemProps) {
	const router = useRouter();
	const [tweetData, setTweetData] = useState<TweetInfo>(tweet);
	const tweetDate = new Date(tweetData.createdAt);
	const relativeTime = getRelativeTimeString(tweetDate);
	const profileImage =
		tweetData.userInfo.profileImageUrl || "/images/default_image.png";
	const componentRef = useRef<HTMLDivElement>(null);
	const [threadLineHeight, setThreadLineHeight] = useState(0);

	useEffect(() => {
		if (showThreadLine && componentRef.current) {
			const height = componentRef.current.clientHeight;
			setThreadLineHeight(height);
		}
	}, [showThreadLine]);

	const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setTweetData((prev) => {
			if (!prev) return prev;
			return {
				...prev,
				HasLiked: !prev.hasLiked,
				LikesCount: prev.hasLiked
					? prev.likesCount - 1
					: prev.likesCount + 1,
			};
		});
	};

	const handleRetweet = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setTweetData((prev) => {
			if (!prev) return prev;
			return {
				...prev,
				HasRetweeted: !prev.hasRetweeted,
				RetweetsCount: prev.hasRetweeted
					? prev.retweetsCount - 1
					: prev.retweetsCount + 1,
			};
		});
	};

	const handleUserNameClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		router.push(`/${tweetData.userInfo.userId}`);
	};

	return (
		<Link href={`/tweets/${tweetData.tweetId}`} className="w-full">
			<div
				ref={componentRef}
				className="flex items-start space-x-2 hover:bg-gray-100 p-4"
			>
				<div className="relative">
					<UserAvatar
						userId={tweetData.userInfo.userId}
						src={profileImage}
						alt={tweetData.userInfo?.userName}
					/>
					{showThreadLine && (
						<div
							className="absolute left-1/2 top-12 w-0.5 bg-gray-500"
							style={{
								height: `${Math.max(
									threadLineHeight - 48,
									0
								)}px`,
								transform: "translateX(-50%)",
							}}
						/>
					)}
				</div>
				<div className="flex-1">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<span
								className="font-semibold hover:underline cursor-pointer"
								onClick={handleUserNameClick}
							>
								{tweetData.userInfo.userName}
							</span>
							{tweetData.userInfo.isPrivate && (
								<Lock
									className="w-4 h-4 text-gray-500"
									aria-label="非公開アカウント"
								/>
							)}
							{tweetData.userInfo.isAdmin && (
								<Shield
									className="w-4 h-4 text-blue-500"
									aria-label="管理者"
								/>
							)}
							<span className="text-gray-500">
								@
								{tweetData.userInfo.userId +
									"・" +
									relativeTime}
							</span>
						</div>
						{tweetData.isPinned && (
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
						{tweetData.content && (
							<HashtagHighlighter text={tweetData.content} />
						)}
						{tweetData.code && (
							<CodeEditor
								value={tweetData.code}
								language="c"
								readOnly={true}
							/>
						)}
						{tweetData.media &&
							tweetData.media.type === "image" && (
								<Image
									src={tweetData.media.url}
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
							<span>{tweetData.repliesCount}</span>
							<span className="sr-only">返信</span>
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={handleRetweet}
							className={`flex items-center space-x-2 hover:bg-green-100 hover:text-green-500 ${
								tweetData.hasRetweeted ? "text-green-500" : ""
							}`}
						>
							<Repeat className="w-4 h-4" />
							<span>{tweetData.retweetsCount}</span>
							<span className="sr-only">リツイート</span>
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={handleLike}
							className={`flex items-center space-x-2 hover:bg-red-100 hover:text-red-500 ${
								tweetData.hasLiked ? "text-red-500" : ""
							}`}
							aria-label={
								tweetData.hasLiked
									? "いいねを取り消す"
									: "いいねする"
							}
						>
							<Heart
								className="w-4 h-4"
								fill={
									tweetData.hasLiked ? "currentColor" : "none"
								}
								stroke={
									tweetData.hasLiked ? "none" : "currentColor"
								}
							/>
							<span>{tweetData.likesCount}</span>
							<span className="sr-only">いいね</span>
						</Button>
					</div>
				</div>
			</div>
		</Link>
	);
}
