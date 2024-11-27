import { getRelativeTimeString } from "@/lib/utils/getRelativeTimeString";
import { TweetInfo } from "@/types/tweetInfo";
import UserAvatar from "../UserAvatar";
import HashtagHighlighter from "../HashTagHighlighter";
import CodeEditor from "../CodeEditor";
import Image from "next/image";
import { Lock, Pin, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface TweetContentProps {
	tweet: TweetInfo;
	withLink?: boolean;
	showThreadLine?: boolean;
	threadLineHeight?: number;
	tweetActions?: React.ReactNode;
}

export default function TweetContent({
	tweet,
	showThreadLine = false,
	threadLineHeight = 0,
	withLink = true,
	tweetActions = null,
}: TweetContentProps) {
	const router = useRouter();
	const tweetDate = getRelativeTimeString(new Date(tweet.createdAt));

	const handleUserNameClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		router.push(`/${tweet.userInfo.userId}`);
	};

	return (
		<div className="flex items-start space-x-2 hover:bg-gray-100 p-4">
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
						<Badge variant="outline" className="flex items-center">
							<Pin className="w-4 h-4 mr-1" />
							ピン留め
						</Badge>
					)}
				</div>
				<div className="mt-2 space-y-4">
					{tweet.content && (
						<HashtagHighlighter text={tweet.content} />
					)}

					{tweet.media && tweet.media.type === "image" && (
						<Image
							src={tweet.media.url}
							alt="ツイートの画像"
							width={600}
							height={300}
							className="rounded-md mt-2 object-cover"
						/>
					)}

					{tweet.code && (
						<CodeEditor
							value={tweet.code.content}
							language={tweet.code.language}
							readOnly={true}
						/>
					)}
				</div>
				{tweetActions}
			</div>
		</div>
	);
}
