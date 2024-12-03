import { UserInfoWithoutBio } from "./userInfoWithoutBio";

export type Code = {
	language: string;
	content: string;
};

export type MediaTypes = "image" | "video";

export type Media = {
	type: MediaTypes;
	url: string;
};

export type TweetInfo = {
	tweetId: number;
	userInfo: UserInfoWithoutBio;
	content?: string;
	code?: Code;
	media?: Media;
	likesCount: number;
	retweetsCount: number;
	repliesCount: number;
	isQuote: boolean;
	isReply: boolean;
	isPinned: boolean;
	hasLiked: boolean;
	hasRetweeted: boolean;
	createdAt: string;
};

export type TweetNode = {
	tweet: TweetInfo;
	originalTweet?: TweetInfo;
	parentReply?: TweetInfo;
	omittedReplyExist?: boolean;
};
