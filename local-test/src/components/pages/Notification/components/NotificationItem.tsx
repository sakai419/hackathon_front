import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Notification } from "@/types/notification";
import { NotificationIcon } from "./NotificationIcon";
import { getRelativeTimeString } from "@/lib/utils/getRelativeTimeString";

export default function NotificationItem({
	notification,
}: {
	notification: Notification;
}) {
	const date = new Date(notification.CreatedAt);
	const relativeTime = getRelativeTimeString(date);

	const profileImage =
		notification.SenderInfo?.ProfileImageUrl || "/images/default_image.png";

	return (
		<div className="flex items-start space-x-4 p-4 hover:bg-gray-50">
			<Avatar className="w-10 h-10">
				<AvatarImage
					src={profileImage}
					alt={notification.SenderInfo?.UserName}
				/>
				<AvatarFallback>
					{notification.SenderInfo?.UserName[0]}
				</AvatarFallback>
			</Avatar>
			<div className="flex-1 space-y-1">
				<div className="flex items-center space-x-2">
					<NotificationIcon type={notification.Type} />
					<Link
						href={`/profile/${notification.SenderInfo?.UserName}`}
						className="font-semibold hover:underline"
					>
						{notification.SenderInfo?.UserName}
					</Link>
					<span className="text-gray-500">
						@{notification.SenderInfo?.UserId}
					</span>
				</div>
				<p>{notification.Content}</p>
				<p className="text-sm text-gray-500">{relativeTime}</p>
			</div>
		</div>
	);
}
