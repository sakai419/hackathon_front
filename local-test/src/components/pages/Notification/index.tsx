import { Button } from "@/components/ui";
import NotificationItem from "./components/NotificationItem";
import useNotifications from "@/hooks/useNotifications";
import { useEffect, useState } from "react";
import { Header } from "@/components/layouts";
import markAllNotificationsAsRead from "@/services/api/notifications/markAllNotificationsAsRead";
import { ErrorMessage, LoadingScreen } from "@/components/common";
import { Notification } from "@/types/notification";
import deleteNotification from "@/services/api/notifications/deleteNotification";

export function NotificationHeader() {
	return <Header title={<h1 className="text-xl font-semibold">通知</h1>} />;
}

export function NotificationPage() {
	const [error, setError] = useState<unknown>(null);
	const [notificationList, setNotificationList] = useState<Notification[]>(
		[]
	);

	const {
		notifications,
		isLoading,
		hasMore,
		loadMore,
		error: notificationError,
	} = useNotifications();

	useEffect(() => {
		setNotificationList(notifications);
	}, [notifications]);

	useEffect(() => {
		const markAsRead = async () => {
			try {
				await markAllNotificationsAsRead();
			} catch (error) {
				console.error("Failed to mark notifications as read", error);
			}
		};

		markAsRead();
	}, []);

	const removeNotification = async (notificationId: number) => {
		try {
			await deleteNotification(notificationId);
			setNotificationList((prev) =>
				prev.filter(
					(notification) => notification.id !== notificationId
				)
			);
		} catch (error) {
			setError(error);
		}
	};

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (error || notificationError) {
		return <ErrorMessage error={error || notificationError} />;
	}

	return (
		<div className="max-w-2xl mx-auto">
			{notificationList &&
				notificationList.map((notification) => (
					<NotificationItem
						key={notification.id}
						notification={notification}
						removeNotification={removeNotification}
					/>
				))}
			<Button onClick={loadMore} className="w-full" disabled={!hasMore}>
				{hasMore ? "もっと見る" : "これ以上通知はありません"}
			</Button>
		</div>
	);
}
