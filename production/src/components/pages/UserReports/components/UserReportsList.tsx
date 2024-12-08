import { Report } from "@/types/report";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getRelativeTimeString } from "@/lib/utils/getRelativeTimeString";

interface UserReportsListProps {
	reports: Report[];
}

export function UserReportsList({ reports }: UserReportsListProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>通報者</TableHead>
					<TableHead>理由</TableHead>
					<TableHead>内容</TableHead>
					<TableHead>日時</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{reports.map((report) => (
					<TableRow key={report.reportId}>
						<TableCell>
							<div className="flex items-center space-x-2">
								<Avatar>
									<AvatarImage
										src={
											report.reporterInfo.profileImageUrl
										}
									/>
									<AvatarFallback>
										{report.reporterInfo.userName.charAt(0)}
									</AvatarFallback>
								</Avatar>
								<span>{report.reporterInfo.userName}</span>
							</div>
						</TableCell>
						<TableCell>{report.reason}</TableCell>
						<TableCell>{report.content || "内容なし"}</TableCell>
						<TableCell>
							{getRelativeTimeString(new Date(report.createdAt))}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
