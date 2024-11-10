import { NotificationType } from "@/types/notification";
import {
	Heart,
	MessageCircle,
	Repeat,
	UserPlus,
	Mail,
	Quote,
	UserCheck,
	Flag,
	AlertTriangle,
	HelpCircle,
} from "lucide-react";

interface NotificationIconProps {
	type: NotificationType;
}

export function NotificationIcon({ type }: NotificationIconProps) {
	const iconProps = { className: "w-4 h-4" };

	switch (type) {
		case "follow":
		case "follow_request":
			return (
				<UserPlus
					{...iconProps}
					className="w-4 h-4 text-blue-500"
					aria-label="フォロー通知"
				/>
			);
		case "like":
			return (
				<Heart
					{...iconProps}
					className="w-4 h-4 text-red-500"
					aria-label="いいね通知"
				/>
			);
		case "retweet":
			return (
				<Repeat
					{...iconProps}
					className="w-4 h-4 text-green-500"
					aria-label="リツイート通知"
				/>
			);
		case "reply":
		case "quote":
			return (
				<MessageCircle
					{...iconProps}
					className="w-4 h-4 text-purple-500"
					aria-label="返信・引用通知"
				/>
			);
		case "message":
			return (
				<Mail
					{...iconProps}
					className="w-4 h-4 text-blue-400"
					aria-label="メッセージ通知"
				/>
			);
		case "request_accepted":
			return (
				<UserCheck
					{...iconProps}
					className="w-4 h-4 text-green-400"
					aria-label="フォローリクエスト承認通知"
				/>
			);
		case "report":
			return (
				<Flag
					{...iconProps}
					className="w-4 h-4 text-orange-500"
					aria-label="報告通知"
				/>
			);
		case "warning":
			return (
				<AlertTriangle
					{...iconProps}
					className="w-4 h-4 text-yellow-500"
					aria-label="警告通知"
				/>
			);
		case "other":
		default:
			return (
				<HelpCircle
					{...iconProps}
					className="w-4 h-4 text-gray-500"
					aria-label="その他の通知"
				/>
			);
	}
}
