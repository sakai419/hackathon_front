import { UserInfo } from "./useInfo";

export type ReportReason =
	| "spam"
	| "harassment"
	| "inappropriate_content"
	| "other";

export type CreateReportRequest = {
	reporterAccountId: string;
	reportedAccountId: string;
	reason: ReportReason;
	content?: string;
};

export type ReportedUserInfo = {
	userInfo: UserInfo;
	reportCount: number;
};
