import { APITweetInfo, TweetInfo } from "./tweetInfo";
import {
	APIUserInfoWithoutBio,
	UserInfoWithoutBio,
} from "./userInfoWithoutBio";

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
	SenderInfo?: UserInfoWithoutBio;
	Type: NotificationType;
	Content?: string;
	RelatedTweet?: TweetInfo;
	IsRead: boolean;
	CreatedAt: string;
};

export type APINotification = {
	id: number;
	sender_info?: APIUserInfoWithoutBio;
	type: string;
	content?: string;
	related_tweet?: APITweetInfo;
	is_read: boolean;
	created_at: string;
};
