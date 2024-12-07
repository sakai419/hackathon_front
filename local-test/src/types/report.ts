// const (
// 	ReportReasonSpam ReportReason = "spam"
// 	ReportReasonHarrassment ReportReason = "harassment"
// 	ReportReasonInappropriateContent ReportReason = "inappropriate_content"
// 	ReportReasonOther ReportReason = "other"
// )

// // CreateReport
// type CreateReportParams struct {
// 	ReporterAccountID string
// 	ReportedAccountID string
// 	Reason            ReportReason
// 	Content           *string
// }

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
