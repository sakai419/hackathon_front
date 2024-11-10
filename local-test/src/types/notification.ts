import { TweetInfo } from "./tweetInfo";
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
	NotificationId: number;
	SenderInfo: UserInfoWithoutBio;
	Type: NotificationType;
	Content?: string;
	RelatedTweet?: TweetInfo;
	IsRead: boolean;
	CreatedAt: string;
};
