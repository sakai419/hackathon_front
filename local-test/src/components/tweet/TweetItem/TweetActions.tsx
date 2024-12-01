import { Code, Media, TweetInfo } from "@/types/tweet";
import { Heart, MessageCircle } from "lucide-react";
import { useState } from "react";
import postReply from "@/services/api/tweets/postReply";
import handleLike from "@/services/api/tweets/handleLike";
import { RetweetButton } from "./RetweetButton";
import ButtonWithTooltip from "@/components/common/ButtonWithTooltip";
import TweetDialog from "../TweetDialog";

interface TweetActionsProps {
	tweet: TweetInfo;
	updateTweet: (tweet: TweetInfo, updateFields: Partial<TweetInfo>) => void;
}

export default function TweetActions({
	tweet,
	updateTweet,
}: TweetActionsProps) {
	const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);

	const onReply = async (content?: string, code?: Code, media?: Media) => {
		try {
			await postReply(tweet.tweetId, content, code, media);
			setIsReplyDialogOpen(false);
			updateTweet(tweet, { repliesCount: tweet.repliesCount + 1 });
		} catch (error) {
			throw error;
		}
	};

	const onLike = async () => {
		try {
			await handleLike(tweet.tweetId, tweet.hasLiked);
			updateTweet(tweet, {
				hasLiked: !tweet.hasLiked,
				likesCount: tweet.hasLiked
					? tweet.likesCount - 1
					: tweet.likesCount + 1,
			});
		} catch (error) {
			throw error;
		}
	};

	const handleReplyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsReplyDialogOpen(true);
	};

	const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		onLike();
	};

	return (
		<>
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
				<RetweetButton tweet={tweet} updateTweet={updateTweet} />
				<ButtonWithTooltip
					description="いいね"
					onClick={handleLikeClick}
					content={
						<>
							<Heart
								className="w-4 h-4"
								fill={tweet.hasLiked ? "currentColor" : "none"}
								stroke={
									tweet.hasLiked ? "none" : "currentColor"
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
			<TweetDialog
				tweetType="reply"
				relatedTweet={tweet}
				isOpen={isReplyDialogOpen}
				onClose={() => setIsReplyDialogOpen(false)}
				onTweet={onReply}
			/>
		</>
	);
}
