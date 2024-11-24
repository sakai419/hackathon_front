import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import MainLayout from "@/components/layouts/MainLayout";
import NotificationItem from "./components/NotificationItem";
import useNotifications from "@/hooks/useNotification";
import Header from "@/components/common/Header";
import LoadingScreen from "@/components/common/LoadingScreen";

export default function NotificationPage() {
	const { notifications, isLoading, hasMore, loadMore, error } =
		useNotifications();

	if (isLoading) {
		return (
			<MainLayout>
				<LoadingScreen />
			</MainLayout>
		);
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<MainLayout>
			{isLoading ? (
				<LoadingScreen />
			) : (
				<div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
					<Header
						title={<h1 className="text-xl font-semibold">通知</h1>}
					/>
					{notifications && (
						<ScrollArea className="h-[calc(100vh-8rem)]">
							{notifications.map((notification) => (
								<NotificationItem
									key={notification.id}
									notification={notification}
								/>
							))}
						</ScrollArea>
					)}
					<div className="p-4 border-t border-gray-200">
						<Button
							onClick={loadMore}
							className="w-full"
							disabled={!hasMore}
						>
							{hasMore
								? "もっと見る"
								: "これ以上通知はありません"}
						</Button>
					</div>
				</div>
			)}
		</MainLayout>
	);
}
