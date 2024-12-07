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
import unfollow from "@/services/api/follow/unfollow";
import requestFollowAndNotify from "@/services/api/follow/requestFollowAndNotify";
import followAndNodify from "@/services/api/follow/followAndNodify";
import blockUser from "@/services/api/block/blockUser";
import { ErrorMessage } from "@/components/common";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";
import ReportUserDialog from "./ReportUserDialog";
import createReport from "@/services/api/report/createUser";
import { ReportReason } from "@/types/report";

interface TweetOptionsButtonProps {
	tweet: TweetInfo;
	updateTweet: (tweet: TweetInfo, updateFields: Partial<TweetInfo>) => void;
	deleteTweet: (tweetId: number) => void;
	isAuthor: boolean;
}

export function TweetOptionsButton({
	tweet,
	updateTweet,
	deleteTweet: deleteTweetFromList,
	isAuthor,
}: TweetOptionsButtonProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
	const [reportDialogOpen, setReportDialogOpen] = useState(false);
	const [error, setError] = useState<unknown>(null);

	const onDelete = async () => {
		try {
			await deleteTweet(tweet.tweetId);
			deleteTweetFromList(tweet.tweetId);
		} catch (error) {
			setError(error);
		}
		setIsOpen(false);
	};

	const onSubmit = async (reason: ReportReason, content?: string) => {
		try {
			await createReport(tweet.userInfo.userId, reason, content);
			setIsOpen(false);
		} catch (error) {
			setError(error);
		}
	};

	const handlePinClick = async () => {
		try {
			await handlePinSetting(tweet.tweetId, tweet.isPinned);
			updateTweet(tweet, { isPinned: !tweet.isPinned });
		} catch (error) {
			setError(error);
		} finally {
			setIsOpen(false);
		}
	};

	const handleFollowClick = async () => {
		try {
			if (tweet.userInfo.isFollowing) {
				await unfollow(tweet.userInfo.userId);
				updateTweet(tweet, {
					userInfo: { ...tweet.userInfo, isFollowing: false },
				});
			} else {
				if (tweet.userInfo.isPrivate) {
					await requestFollowAndNotify(tweet.userInfo.userId);
					updateTweet(tweet, {
						userInfo: { ...tweet.userInfo, isPending: true },
					});
				} else {
					await followAndNodify(tweet.userInfo.userId);
					updateTweet(tweet, {
						userInfo: { ...tweet.userInfo, isFollowing: true },
					});
				}
			}
		} catch (error) {
			setError(error);
		} finally {
			setIsOpen(false);
		}
	};

	const handleBlockClick = async () => {
		try {
			await blockUser(tweet.userInfo.userId);
		} catch (error) {
			setError(error);
		}
		setIsOpen(false);
	};

	if (error) {
		return <ErrorMessage error={error} />;
	}

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
							<ConfirmationDialog
								isOpen={confirmDialogOpen}
								onClose={() => {
									setConfirmDialogOpen(false);
									setIsOpen(false);
								}}
								onConfirm={onDelete}
								title="ツイートを削除"
								description="このツイートを削除しますか？この操作は取り消せません。"
							/>
							<Button
								variant="ghost"
								className="flex items-center justify-start space-x-2 w-full"
								onClick={() => setConfirmDialogOpen(true)}
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
							{tweet.userInfo.isFollowing ? (
								<Button
									variant="ghost"
									className="flex items-center justify-start space-x-2 w-full"
									onClick={handleFollowClick}
								>
									<UserX className="w-4 h-4 font-semibold" />
									<span className="font-semibold">
										@{tweet.userInfo.userId}
										さんをフォロー解除
									</span>
								</Button>
							) : tweet.userInfo.isPending ? (
								<Button
									variant="ghost"
									className="flex items-center justify-start space-x-2 w-full"
									onClick={() => {}}
								>
									<UserPlus className="w-4 h-4 font-semibold" />
									<span className="font-semibold">
										@${tweet.userInfo.userId}
										さんにフォロー申請中
									</span>
								</Button>
							) : tweet.userInfo.isPrivate ? (
								<Button
									variant="ghost"
									className="flex items-center justify-start space-x-2 w-full"
									onClick={handleFollowClick}
								>
									<UserPlus className="w-4 h-4 font-semibold" />
									<span className="font-semibold">
										@{tweet.userInfo.userId}
										さんにフォローリクエストを送る
									</span>
								</Button>
							) : (
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
							)}
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
								onClick={() => setReportDialogOpen(true)}
							>
								<Flag className="w-4 h-4 font-semibold" />
								<span className="font-semibold">
									@{tweet.userInfo.userId}さんを通報
								</span>
							</Button>
							<ReportUserDialog
								isOpen={reportDialogOpen}
								setIsOpen={setReportDialogOpen}
								onSubmit={onSubmit}
							/>
						</>
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
}
