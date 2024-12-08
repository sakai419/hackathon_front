import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ReportedUserInfo } from "@/types/report";

interface ReportedUsersListProps {
	users: ReportedUserInfo[];
}

export function ReportedUsersList({ users }: ReportedUsersListProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>ユーザーID</TableHead>
					<TableHead>ユーザー名</TableHead>
					<TableHead className="text-right">通報件数</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users.map((user) => (
					<TableRow key={user.userInfo.userId}>
						<TableCell>{user.userInfo.userId}</TableCell>
						<TableCell className="font-medium">
							{user.userInfo.userName}
						</TableCell>
						<TableCell className="text-right">
							{user.reportCount}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
