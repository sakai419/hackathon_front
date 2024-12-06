import Link from "next/link";
import { Notification } from "@/types/notification";
import { NotificationIcon } from "./NotificationIcon";
import { getRelativeTimeString } from "@/lib/utils/getRelativeTimeString";
import { Lock, Shield, Trash } from "lucide-react";
import UserAvatar from "@/components/user/UserAvatar";
import { RelatedTweetCard } from "@/components/tweet";
import { Button } from "@/components/ui";
import acceptFollowRequestAndNotify from "@/services/api/follow/acceptFollowRequestAndNotify";
import { useEffect, useState } from "react";
import rejectFollowRequest from "@/services/api/follow/rejectFollowRequest";
import { ButtonWithTooltip, ErrorMessage } from "@/components/common";

interface NotificationItemProps {
	notification: Notification;
	removeNotification: (notificationId: number) => void;
}

export default function NotificationItem({
	notification,
	removeNotification,
}: NotificationItemProps) {
	const [error, setError] = useState<unknown>(null);
	const [isFollowed, setIsFollowed] = useState(false);

	const date = new Date(notification.createdAt);
	const relativeTime = getRelativeTimeString(date);

	let message = "";

	switch (notification.type) {
		case "follow":
			message = `${notification.senderInfo?.userName}さんがあなたをフォローしました`;
			break;
		case "like":
			message = `${notification.senderInfo?.userName}さんがあなたのツイートをいいねしました`;
			break;
		case "retweet":
			message = `${notification.senderInfo?.userName}さんがあなたのツイートをリツイートしました`;
			break;
		case "reply":
			message = `${notification.senderInfo?.userName}さんがあなたのツイートに返信しました`;
			break;
		case "quote":
			message = `${notification.senderInfo?.userName}さんがあなたのツイートを引用しました`;
			break;
		case "follow_request":
			message = `${notification.senderInfo?.userName}さんがあなたにフォローリクエストを送りました`;
			break;
		case "request_accepted":
			message = `${notification.senderInfo?.userName}さんがあなたのフォローリクエストを承認しました`;
			break;
		case "warning":
			message = "あなたに警告を送りました";
			break;
		case "other":
			message = notification.content || "";
			break;
		default:
	}

	const handleAccept = async () => {
		if (!notification.senderInfo) {
			return;
		}
		try {
			await acceptFollowRequestAndNotify(notification.senderInfo.userId);
			setIsFollowed(true);
		} catch (error) {
			setError(error);
		}
	};

	const handleReject = async () => {
		if (!notification.senderInfo) {
			return;
		}
		try {
			await rejectFollowRequest(notification.senderInfo.userId);
			removeNotification(notification.id);
		} catch (error) {
			setError(error);
		}
	};

	useEffect(() => {
		setIsFollowed(notification.senderInfo?.isFollowed || false);
	}, [notification.senderInfo]);

	if (error) {
		return <ErrorMessage error={error} />;
	}

	return (
		<div className="relative flex items-start space-x-4 p-4 hover:bg-gray-50">
			<NotificationIcon type={notification.type} />
			<div className="flex-1 space-y-1">
				<div className="flex items-center space-x-2">
					{notification.senderInfo && (
						<UserAvatar
							userId={notification.senderInfo.userId}
							src={notification.senderInfo.profileImageUrl}
							alt={notification.senderInfo.userName}
							size="w-10 h-10"
						/>
					)}
					<Link
						href={`/${notification.senderInfo?.userName}`}
						className="font-semibold hover:underline"
					>
						{notification.senderInfo?.userName}
					</Link>
					<span className="text-gray-500">
						@{notification.senderInfo?.userId}
					</span>
					{notification.senderInfo?.isPrivate && (
						<Lock
							className="w-4 h-4 text-gray-500"
							aria-label="非公開アカウント"
						/>
					)}
					{notification.senderInfo?.isAdmin && (
						<Shield
							className="w-4 h-4 text-blue-500"
							aria-label="管理者"
						/>
					)}
				</div>
				<p>{message}</p>
				{notification.type === "follow_request" && (
					<>
						{isFollowed ? (
							<p className="text-sm text-gray-500">承認済み</p>
						) : (
							<div className="flex items-end space-x-2">
								<Button className="p-4" onClick={handleAccept}>
									承認
								</Button>
								<Button
									className="p-4 bg-red-500 hover:bg-red-600"
									onClick={handleReject}
								>
									拒否
								</Button>
							</div>
						)}
					</>
				)}
				<p className="text-sm text-gray-500">{relativeTime}</p>
				{notification.relatedTweet && (
					<RelatedTweetCard tweet={notification.relatedTweet} />
				)}
				<ButtonWithTooltip
					description="通知を削除"
					onClick={() => removeNotification(notification.id)}
					content={<Trash className="w-4 h-4" />}
					buttonClassName="absolute top-2 right-2"
				/>
				{!notification.isRead && (
					<div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary/80" />
				)}
			</div>
		</div>
	);
}
