import { getRelativeTimeString } from "@/lib/utils/getRelativeTimeString";
import { TweetInfo } from "@/types/tweet";
import Image from "next/image";
import { Lock, Pin, Shield } from "lucide-react";
import { Badge } from "@/components/ui";
import { useRouter } from "next/navigation";
import TweetActions from "./TweetActions";
import { useEffect, useRef, useState } from "react";
import RelatedTweetCard from "../RelatedTweetCard";
import { UserAvatar, CodeEditor } from "@/components/common";
import Highlighter from "./Highlighter";
import { TweetOptionsButton } from "./TweetOptionsButton";

interface TweetItemProps {
	clientUserId: string;
	tweet: TweetInfo;
	highlightWord?: string;
	showThreadLine?: boolean;
	withLink?: boolean;
	withActions?: boolean;
	updateTweet?: (tweet: TweetInfo, updateFields: Partial<TweetInfo>) => void;
	quotedTweet?: TweetInfo;
}

export default function TweetItem({
	clientUserId,
	tweet,
	highlightWord,
	showThreadLine = false,
	withLink = true,
	withActions = true,
	updateTweet,
	quotedTweet,
}: TweetItemProps) {
	const router = useRouter();
	const [threadLineHeight, setThreadLineHeight] = useState(0);
	const componentRef = useRef<HTMLDivElement>(null);
	const tweetDate = getRelativeTimeString(new Date(tweet.createdAt));
	const isAuthor = tweet.userInfo.userId === clientUserId;

	useEffect(() => {
		if (showThreadLine && componentRef.current) {
			const height = componentRef.current.clientHeight;
			setThreadLineHeight(height);
		}
	}, [showThreadLine]);

	const handleUserNameClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		router.push(`/${tweet.userInfo.userId}`);
	};

	const handleTweetClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			router.push(`/tweets/${tweet.tweetId}`);
		}
	};

	return (
		<div
			className="relative flex flex-shrink-0 items-start space-x-2 hover:bg-gray-100 p-4"
			onClick={handleTweetClick}
			ref={componentRef}
		>
			<div className="relative">
				<UserAvatar
					userId={tweet.userInfo.userId}
					src={tweet.userInfo.profileImageUrl}
					alt={tweet.userInfo?.userName}
					withLink={withLink}
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
			{withActions && isAuthor !== undefined && updateTweet && (
				<div className="absolute top-2 right-0 ">
					<TweetOptionsButton
						tweet={tweet}
						updateTweet={updateTweet}
						isAuthor={isAuthor}
					/>
				</div>
			)}
			<div className="flex-1">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<span
							className={`font-semibold ${
								withLink ? "hover:underline cursor-pointer" : ""
							}`}
							{...(withLink
								? { onClick: handleUserNameClick }
								: {})}
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
							@{tweet.userInfo.userId + "・" + tweetDate}
						</span>
					</div>
					{tweet.isPinned && (
						<Badge
							variant="outline"
							className="absolute top-4 right-8 flex items-center"
						>
							<Pin className="w-4 h-4 mr-1" />
							ピン留め
						</Badge>
					)}
				</div>
				<div className="mt-2 space-y-4">
					{tweet.content && (
						<div className="whitespace-pre-wrap break-words">
							<Highlighter
								text={tweet.content}
								highlightWord={highlightWord}
							/>
						</div>
					)}
					{tweet.media &&
						(tweet.media.type === "image" ? (
							<Image
								src={tweet.media.url}
								alt="ツイートの画像"
								width={600}
								height={300}
								className="rounded-md mt-2 object-cover"
							/>
						) : (
							<video
								controls
								className="rounded-xl object-cover max-h-[300px] w-full"
							>
								<source
									src={tweet.media.url}
									type="video/mp4"
								/>
								Your browser does not support the video tag.
							</video>
						))}
					{tweet.code && (
						<CodeEditor
							value={tweet.code.content}
							language={tweet.code.language}
							readOnly={true}
						/>
					)}
					{quotedTweet && <RelatedTweetCard tweet={quotedTweet} />}
				</div>
				{withActions && updateTweet && (
					<TweetActions tweet={tweet} updateTweet={updateTweet} />
				)}
			</div>
		</div>
	);
}
