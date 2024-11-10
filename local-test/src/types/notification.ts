import { TweetInfo } from "./tweetInfo";
import { UserInfo } from "./useInfo";

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
	NotificationId: number;
	SenderInfo: UserInfo;
	Type: NotificationType;
	Content?: string;
	RelatedTweet?: TweetInfo;
	IsRead: boolean;
	CreatedAt: string;
};
