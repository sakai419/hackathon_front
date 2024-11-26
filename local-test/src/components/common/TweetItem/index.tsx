import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Repeat, Pin, Lock, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Code, Media, TweetInfo } from "@/types/tweetInfo";
import { getRelativeTimeString } from "@/lib/utils/getRelativeTimeString";
import UserAvatar from "../UserAvatar";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import HashtagHighlighter from "../HashTagHighlighter";
import CodeEditor from "../CodeEditor";
import ButtonWithTooltip from "../ButtonWithTooltip";
import TweetDialog from "../TweetDialog";
import { useClientProfileContext } from "@/context/ClientProfileProvider";
import postReply from "@/services/api/tweets/postReply";

type TweetItemProps = {
	tweet: TweetInfo;
	showThreadLine?: boolean;
	updateTweet: (tweet: TweetInfo, updateFields: Partial<TweetInfo>) => void;
	readOnly?: boolean;
};

export default function TweetItem({
	tweet,
	showThreadLine = false,
	updateTweet,
	readOnly = false,
}: TweetItemProps) {
	const router = useRouter();
	const tweetDate = new Date(tweet.createdAt);
	const relativeTime = getRelativeTimeString(tweetDate);
	const componentRef = useRef<HTMLDivElement>(null);
	const [threadLineHeight, setThreadLineHeight] = useState(0);
	const [isOpen, setIsOpen] = useState(false);

	const clientProfile = useClientProfileContext().profile;

	useEffect(() => {
		if (showThreadLine && componentRef.current) {
			const height = componentRef.current.clientHeight;
			setThreadLineHeight(height);
		}
	}, [showThreadLine]);

	const handleReplyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsOpen(true);
	};

	const handleReply = async (content: string, code?: Code, media?: Media) => {
		try {
			await postReply({
				tweetId: tweet.tweetId,
				content,
				code,
				media,
			});
			setIsOpen(false);
		} catch (error) {
			throw error;
		}
	};

	const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		updateTweet(tweet, {
			hasLiked: !tweet.hasLiked,
			likesCount: tweet.hasLiked
				? tweet.likesCount - 1
				: tweet.likesCount + 1,
		});
	};

	const handleRetweetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		updateTweet(tweet, {
			hasRetweeted: !tweet.hasRetweeted,
			retweetsCount: tweet.hasRetweeted
				? tweet.retweetsCount - 1
				: tweet.retweetsCount + 1,
		});
	};

	const handleUserNameClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		router.push(`/${tweet.userInfo.userId}`);
	};

	const content = (
		<div
			ref={componentRef}
			className="flex items-start space-x-2 hover:bg-gray-100 p-4"
		>
			<div className="relative">
				<UserAvatar
					userId={tweet.userInfo.userId}
					src={tweet.userInfo.profileImageUrl}
					alt={tweet.userInfo?.userName}
				/>
				{showThreadLine && (
					<div
						className="absolute left-1/2 top-12 w-0.5 bg-gray-500"
						style={{
							height: `${Math.max(threadLineHeight - 48, 0)}px`,
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
							{tweet.userInfo.userName}
						</span>
						{tweet.userInfo.isPrivate && (
							<Lock
								className="w-4 h-4 text-gray-500"
								aria-label="非公開アカウント"
							/>
						)}
						{tweet.userInfo.isAdmin && (
							<Shield
								className="w-4 h-4 text-blue-500"
								aria-label="管理者"
							/>
						)}
						<span className="text-gray-500">
							@{tweet.userInfo.userId + "・" + relativeTime}
						</span>
					</div>
					{tweet.isPinned && (
						<Badge variant="outline" className="flex items-center">
							<Pin className="w-4 h-4 mr-1" />
							ピン留め
						</Badge>
					)}
				</div>
				<div className="mt-2">
					{tweet.content && (
						<HashtagHighlighter text={tweet.content} />
					)}
					{tweet.code && (
						<CodeEditor
							value={tweet.code.content}
							language={tweet.code.language}
							readOnly={true}
						/>
					)}
					{tweet.media && tweet.media.type === "image" && (
						<Image
							src={tweet.media.url}
							alt="ツイートの画像"
							width={500}
							height={300}
							className="rounded-md mt-2 object-cover"
						/>
					)}
				</div>
				{!readOnly && (
					<div className="flex justify-between text-gray-500 mt-4">
						<ButtonWithTooltip
							description="返信"
							onClick={handleReplyClick}
							content={
								<>
									<MessageCircle className="w-4 h-4" />
									<span>{tweet.repliesCount}</span>
								</>
							}
							buttonClassName="flex items-center space-x-2 hover:bg-sky-100 hover:text-sky-500"
						/>
						<ButtonWithTooltip
							description="リツイート"
							onClick={handleRetweetClick}
							content={
								<>
									<Repeat className="w-4 h-4" />
									<span>{tweet.retweetsCount}</span>
								</>
							}
							buttonClassName={`flex items-center space-x-2 hover:bg-green-100 hover:text-green-500 ${
								tweet.hasRetweeted ? "text-green-500" : ""
							}`}
						/>
						<ButtonWithTooltip
							description="いいね"
							onClick={handleLikeClick}
							content={
								<>
									<Heart
										className="w-4 h-4"
										fill={
											tweet.hasLiked
												? "currentColor"
												: "none"
										}
										stroke={
											tweet.hasLiked
												? "none"
												: "currentColor"
										}
									/>
									<span>{tweet.likesCount}</span>
								</>
							}
							buttonClassName={`flex items-center space-x-2 hover:bg-red-100 hover:text-red-500 ${
								tweet.hasLiked ? "text-red-500" : ""
							}`}
						/>
					</div>
				)}
			</div>
		</div>
	);

	if (readOnly) {
		return <div className="w-full">{content}</div>;
	}

	return (
		<>
			<Link href={`/tweets/${tweet.tweetId}`} className="w-full">
				{content}
			</Link>
			<TweetDialog
				tweetType="reply"
				relatedTweet={tweet}
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				onTweet={handleReply}
				userInfo={clientProfile?.userInfo}
			/>
		</>
	);
}
