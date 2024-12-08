import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	Button,
} from "@/components/ui";
import { ReportedUsersList } from "./ReportedUserList";
import useReportedUsers from "@/hooks/useReportedUsers";
import { ErrorMessage } from "@/components/common";

export default function ReportedUsersCard() {
	const { users, isLoading, hasMore, loadMore, error } = useReportedUsers();

	if (error) {
		return <ErrorMessage error={error} />;
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>通報されたユーザー</CardTitle>
			</CardHeader>
			<CardContent>
				<ReportedUsersList users={users} />
				<Button
					onClick={loadMore}
					disabled={!hasMore || isLoading}
					className="mt-4"
				>
					{isLoading
						? "読み込み中..."
						: hasMore
						? "もっと見る"
						: "すべて読み込み済み"}
				</Button>
			</CardContent>
		</Card>
	);
}
