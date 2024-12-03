import React, { useState } from "react";
import {
	Button,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui";
import {
	MoreHorizontal,
	Trash2,
	Pin,
	UserPlus,
	UserX,
	Flag,
	Undo,
} from "lucide-react";
import handlePinSetting from "@/services/api/tweets/handlePinSetting";
import { TweetInfo } from "@/types/tweet";
import deleteTweet from "@/services/api/tweets/deleteTweet";

interface TweetOptionsButtonProps {
	tweet: TweetInfo;
	updateTweet: (tweet: TweetInfo, updateFields: Partial<TweetInfo>) => void;
	isAuthor: boolean;
}

export function TweetOptionsButton({
	tweet,
	updateTweet,
	isAuthor,
}: TweetOptionsButtonProps) {
	const [isOpen, setIsOpen] = useState(false);

	const handleDeleteClick = async () => {
		try {
			await deleteTweet(tweet.tweetId);
		} catch (error) {
			console.log("Failed to delete tweet:", error);
			throw error;
		}
		setIsOpen(false);
	};

	const handlePinClick = async () => {
		try {
			await handlePinSetting(tweet.tweetId, tweet.isPinned);
			updateTweet(tweet, { isPinned: !tweet.isPinned });
		} catch (error) {
			console.log("Failed to handle pin setting:", error);
			throw error;
		} finally {
			setIsOpen(false);
		}
	};

	const handleFollowClick = () => {
		console.log(`Follow @${tweet.userInfo.userId}`);
		setIsOpen(false);
	};

	const handleBlockClick = () => {
		console.log(`Block @${tweet.userInfo.userId}`);
		setIsOpen(false);
	};

	const handleReportClick = () => {
		console.log(`Report @${tweet.userInfo.userId}`);
		setIsOpen(false);
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="hover:bg-gray-200 hover:text-gray-800"
				>
					<MoreHorizontal className="w-4 h-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<div className="flex flex-col">
					{isAuthor ? (
						<>
							<Button
								variant="ghost"
								className="flex items-center justify-start space-x-2 w-full"
								onClick={handleDeleteClick}
							>
								<Trash2
									className="w-4 h-4 font-semibold"
									color="red"
								/>
								<span className="text-red-500 font-semibold">
									削除
								</span>
							</Button>
							<Button
								variant="ghost"
								className="flex items-center justify-start space-x-2 w-full"
								onClick={handlePinClick}
							>
								{tweet.isPinned ? (
									<>
										<Undo className="w-4 h-4 font-semibold" />
										<span className="font-semibold">
											ピン留めを解除する
										</span>
									</>
								) : (
									<>
										<Pin className="w-4 h-4 font-semibold" />
										<span className="font-semibold">
											プロフィールにピン留めする
										</span>
									</>
								)}
							</Button>
						</>
					) : (
						<>
							<Button
								variant="ghost"
								className="flex items-center justify-start space-x-2 w-full"
								onClick={handleFollowClick}
							>
								<UserPlus className="w-4 h-4 font-semibold" />
								<span className="font-semibold">
									@{tweet.userInfo.userId}さんをフォロー
								</span>
							</Button>
							<Button
								variant="ghost"
								className="flex items-center justify-start space-x-2 w-full"
								onClick={handleBlockClick}
							>
								<UserX className="w-4 h-4 font-semibold" />
								<span className="font-semibold">
									@{tweet.userInfo.userId}さんをブロック
								</span>
							</Button>
							<Button
								variant="ghost"
								className="flex items-center justify-start space-x-2 w-full"
								onClick={handleReportClick}
							>
								<Flag className="w-4 h-4 font-semibold" />
								<span className="font-semibold">
									@{tweet.userInfo.userId}さんを通報
								</span>
							</Button>
						</>
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
}
