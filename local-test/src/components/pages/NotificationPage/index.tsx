import { Button } from "@/components/ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import NotificationItem from "@/features/notification/components/NotificationItem";
import { NotificationType } from "@/types/notification";
import MainLayout from "@/components/layouts/MainLayout";

const notifications = [
	{
		NotificationId: 1,
		SenderInfo: {
			UserId: "user1",
			UserName: "user1",
			ProfileImageUrl: "/images/default_image.png",
			Bio: "Hello, World!",
			IsPrivate: false,
			IsAdmin: true,
		},
		Type: "like" as NotificationType,
		Content: "あなたのツイートがいいねされました",
		RelatedTweet: null,
		IsRead: false,
		CreatedAt: "2021-08-01T12:00:00Z",
	},
	{
		NotificationId: 2,
		SenderInfo: {
			UserId: "user2",
			UserName: "user2",
			ProfileImageUrl: "/images/default_image.png",
			Bio: "Hello, World!",
			IsPrivate: true,
			IsAdmin: false,
		},
		Type: "retweet" as NotificationType,
		Content: "あなたのツイートがリツイートされました",
		RelatedTweet: null,
		IsRead: true,
		CreatedAt: "2021-08-01T12:00:00Z",
	},
	{
		NotificationId: 3,
		SenderInfo: {
			UserId: "user3",
			UserName: "user3",
			ProfileImageUrl: "/images/default_image.png",
			Bio: "Hello, World!",
			IsPrivate: false,
			IsAdmin: false,
		},
		Type: "reply" as NotificationType,
		Content: "あなたのツイートに返信がありました",
		RelatedTweet: null,
		IsRead: false,
		CreatedAt: "2021-08-01T12:00:00Z",
	},
];

export default function NotificationPage() {
	return (
		<MainLayout>
			<div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
				<div className="p-4 border-b border-gray-200">
					<h1 className="text-xl font-semibold">通知</h1>
				</div>
				<ScrollArea className="h-[calc(100vh-8rem)]">
					{notifications.map((notification) => (
						<NotificationItem
							key={notification.NotificationId}
							notification={notification}
						/>
					))}
				</ScrollArea>
				<div className="p-4 border-t border-gray-200">
					<Button variant="outline" className="w-full">
						すべての通知を見る
					</Button>
				</div>
			</div>
		</MainLayout>
	);
}
