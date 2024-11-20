import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Notification } from "@/types/notification";
import { NotificationIcon } from "./NotificationIcon";
import { getRelativeTimeString } from "@/lib/utils/getRelativeTimeString";
import RelatedTweetCard from "@/components/common/RelatedTweetCard";
import { Lock, Shield } from "lucide-react";

export default function NotificationItem({
	notification,
}: {
	notification: Notification;
}) {
	const date = new Date(notification.createdAt);
	const relativeTime = getRelativeTimeString(date);

	const profileImage =
		notification.senderInfo?.profileImageUrl || "/images/default_image.png";

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

	return (
		<div className="flex items-start space-x-4 p-4 hover:bg-gray-50">
			<NotificationIcon type={notification.type} />
			<div className="flex-1 space-y-1">
				<div className="flex items-center space-x-2">
					<Avatar className="w-10 h-10">
						<AvatarImage
							src={profileImage}
							alt={notification.senderInfo?.userName}
						/>
						<AvatarFallback>
							{notification.senderInfo?.userName[0]}
						</AvatarFallback>
					</Avatar>
					<Link
						href={`/profile/${notification.senderInfo?.userName}`}
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
				<p className="text-sm text-gray-500">{relativeTime}</p>
				{notification.relatedTweet && (
					<RelatedTweetCard tweet={notification.relatedTweet} />
				)}
			</div>
		</div>
	);
}
