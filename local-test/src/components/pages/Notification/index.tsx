import { Button } from "@/components/ui/button";
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
			<MainLayout
				header={
					<Header
						title={<h1 className="text-xl font-semibold">通知</h1>}
					/>
				}
			>
				<LoadingScreen />
			</MainLayout>
		);
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<MainLayout
			header={
				<Header
					title={<h1 className="text-xl font-semibold">通知</h1>}
				/>
			}
		>
			{isLoading ? (
				<LoadingScreen />
			) : (
				<div className="max-w-2xl mx-auto">
					{notifications &&
						notifications.map((notification) => (
							<NotificationItem
								key={notification.id}
								notification={notification}
							/>
						))}
					<Button
						onClick={loadMore}
						className="w-full"
						disabled={!hasMore}
					>
						{hasMore ? "もっと見る" : "これ以上通知はありません"}
					</Button>
				</div>
			)}
		</MainLayout>
	);
}
