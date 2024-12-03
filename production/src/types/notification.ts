import { TweetInfo } from "./tweet";
import { UserInfoWithoutBio } from "./userInfoWithoutBio";

export type NotificationType =
	| "follow"
	| "like"
	| "retweet"
	| "reply"
	| "message"
	| "quote"
	| "follow_request"
	| "request_accepted"
	| "report"
	| "warning"
	| "other";

export type Notification = {
	id: number;
	senderInfo?: UserInfoWithoutBio;
	type: NotificationType;
	content?: string;
	relatedTweet?: TweetInfo;
	isRead: boolean;
	createdAt: string;
};
