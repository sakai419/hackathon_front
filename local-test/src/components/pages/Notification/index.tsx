import { Button } from "@/components/ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Notification, NotificationType } from "@/types/notification";
import MainLayout from "@/components/layouts/MainLayout";
import NotificationItem from "./components/NotificationItem";
import { useEffect, useState } from "react";
import useNotifications from "@/hooks/useNotification";
import Header from "@/components/elements/Header";

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
		RelatedTweet: {
			TweetId: 1,
			UserInfo: {
				UserId: "1",
				UserName: "田中太郎",
				ProfileImageUrl: "",
				IsPrivate: false,
				IsAdmin: true,
			},
			Content: "今日は晴れですね！散歩に行ってきます。",
			LikesCount: 15,
			RetweetsCount: 3,
			RepliesCount: 2,
			IsQuote: false,
			IsReply: false,
			IsPinned: true,
			HasLiked: true,
			HasRetweeted: false,
			CreatedAt: "2023-06-15T09:00:00Z",
		},
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
		IsRead: false,
		CreatedAt: "2021-08-01T12:00:00Z",
	},
];

export function NotificationExample() {
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

export default function NotificationPage() {
	const { notifications, loading, error } = useNotifications();

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<MainLayout>
			<div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
				<Header
					title={<h1 className="text-xl font-semibold">通知</h1>}
				/>
				{notifications && (
					<ScrollArea className="h-[calc(100vh-8rem)]">
						{notifications.map((notification) => (
							<NotificationItem
								key={notification.NotificationId}
								notification={notification}
							/>
						))}
					</ScrollArea>
				)}
				<div className="p-4 border-t border-gray-200">
					<Button variant="outline" className="w-full">
						すべての通知を見る
					</Button>
				</div>
			</div>
		</MainLayout>
	);
}
