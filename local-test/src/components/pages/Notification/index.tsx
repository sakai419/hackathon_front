import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import MainLayout from "@/components/layouts/MainLayout";
import NotificationItem from "./components/NotificationItem";
import useNotifications from "@/hooks/useNotification";
import Header from "@/components/elements/Header";

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
