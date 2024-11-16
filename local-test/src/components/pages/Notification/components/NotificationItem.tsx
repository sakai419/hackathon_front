import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Notification } from "@/types/notification";
import { NotificationIcon } from "./NotificationIcon";
import { getRelativeTimeString } from "@/lib/utils/getRelativeTimeString";
import RelatedTweetCard from "@/components/elements/RelatedTweetCard";
import { Lock, Shield } from "lucide-react";
import { useEffect } from "react";

export default function NotificationItem({
	notification,
}: {
	notification: Notification;
}) {
	const date = new Date(notification.CreatedAt);
	const relativeTime = getRelativeTimeString(date);

	const profileImage =
		notification.SenderInfo?.ProfileImageUrl || "/images/default_image.png";

	var message = "";

	switch (notification.Type) {
		case "follow":
			message = `${notification.SenderInfo?.UserName}さんがあなたをフォローしました`;
			break;
		case "like":
			message = `${notification.SenderInfo?.UserName}さんがあなたのツイートをいいねしました`;
			break;
		case "retweet":
			message = `${notification.SenderInfo?.UserName}さんがあなたのツイートをリツイートしました`;
			break;
		case "reply":
			message = `${notification.SenderInfo?.UserName}さんがあなたのツイートに返信しました`;
			break;
		case "quote":
			message = `${notification.SenderInfo?.UserName}さんがあなたのツイートを引用しました`;
			break;
		case "follow_request":
			message = `${notification.SenderInfo?.UserName}さんがあなたにフォローリクエストを送りました`;
			break;
		case "request_accepted":
			message = `${notification.SenderInfo?.UserName}さんがあなたのフォローリクエストを承認しました`;
			break;
		case "warning":
			message = "あなたに警告を送りました";
			break;
		case "other":
			message = notification.Content || "";
			break;
		default:
	}

	useEffect(() => {
		console.log(notification);
	}, []);

	return (
		<div className="flex items-start space-x-4 p-4 hover:bg-gray-50">
			<NotificationIcon type={notification.Type} />
			<div className="flex-1 space-y-1">
				<div className="flex items-center space-x-2">
					<Avatar className="w-10 h-10">
						<AvatarImage
							src={profileImage}
							alt={notification.SenderInfo?.UserName}
						/>
						<AvatarFallback>
							{notification.SenderInfo?.UserName[0]}
						</AvatarFallback>
					</Avatar>
					<Link
						href={`/profile/${notification.SenderInfo?.UserName}`}
						className="font-semibold hover:underline"
					>
						{notification.SenderInfo?.UserName}
					</Link>
					<span className="text-gray-500">
						@{notification.SenderInfo?.UserId}
					</span>
					{notification.SenderInfo?.IsPrivate && (
						<Lock
							className="w-4 h-4 text-gray-500"
							aria-label="非公開アカウント"
						/>
					)}
					{notification.SenderInfo?.IsAdmin && (
						<Shield
							className="w-4 h-4 text-blue-500"
							aria-label="管理者"
						/>
					)}
				</div>
				<p>{message}</p>
				<p className="text-sm text-gray-500">{relativeTime}</p>
				{notification.RelatedTweet && (
					<RelatedTweetCard tweet={notification.RelatedTweet} />
				)}
			</div>
		</div>
	);
}
