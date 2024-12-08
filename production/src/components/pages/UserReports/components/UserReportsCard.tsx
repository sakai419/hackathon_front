import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui";
import { UserReportsList } from "./UserReportsList";
import useUserReports from "@/hooks/useUserReports";
import { ErrorMessage } from "@/components/common";

export default function UserReportsCard({ userId }: { userId: string }) {
	const { reports, isLoading, hasMore, loadMore, error } =
		useUserReports(userId);

	if (error) {
		return <ErrorMessage error={error} />;
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>ユーザー通報一覧</CardTitle>
			</CardHeader>
			<CardContent>
				<UserReportsList reports={reports} />
				<Button
					onClick={loadMore}
					disabled={!hasMore || isLoading}
					className="w-full"
				>
					{isLoading
						? "読み込み中..."
						: hasMore
						? "もっと見る"
						: "もっと見る"}
				</Button>
			</CardContent>
		</Card>
	);
}
