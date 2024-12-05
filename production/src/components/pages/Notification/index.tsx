import { Button } from "@/components/ui";
import NotificationItem from "./components/NotificationItem";
import useNotifications from "@/hooks/useNotifications";
import LoadingScreen from "@/components/common/LoadingScreen";
import { useEffect } from "react";
import { Header } from "@/components/layouts";
import markAllNotificationsAsRead from "@/services/api/notifications/markAllNotificationsAsRead";
import { ErrorMessage } from "@/components/common";

export function NotificationHeader() {
	return <Header title={<h1 className="text-xl font-semibold">通知</h1>} />;
}

export function NotificationPage() {
	const { notifications, isLoading, hasMore, loadMore, error } =
		useNotifications();

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

	if (isLoading) {
		return <LoadingScreen />;
	}

	if (error) {
		return <ErrorMessage error={error} />;
	}

	return (
		<div className="max-w-2xl mx-auto">
			{notifications &&
				notifications.map((notification) => (
					<NotificationItem
						key={notification.id}
						notification={notification}
					/>
				))}
			<Button onClick={loadMore} className="w-full" disabled={!hasMore}>
				{hasMore ? "もっと見る" : "これ以上通知はありません"}
			</Button>
		</div>
	);
}
