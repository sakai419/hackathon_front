import {
	APIUserInfoWithoutBio,
	UserInfoWithoutBio,
} from "./userInfoWithoutBio";

export type MediaTypes = "image" | "video";

export type Media = {
	type: MediaTypes;
	url: string;
};

export type APIMedia = {
	type: string;
	url: string;
};

export type TweetInfo = {
	TweetId: number;
	UserInfo: UserInfoWithoutBio;
	Content?: string;
	Code?: string;
	Media?: Media;
	LikesCount: number;
	RetweetsCount: number;
	RepliesCount: number;
	IsQuote: boolean;
	IsReply: boolean;
	IsPinned: boolean;
	HasLiked: boolean;
	HasRetweeted: boolean;
	CreatedAt: string;
};

export type APITweetInfo = {
	tweet_id: number;
	user_info: APIUserInfoWithoutBio;
	content?: string;
	code?: string;
	media?: APIMedia;
	likes_count: number;
	retweets_count: number;
	replies_count: number;
	is_quote: boolean;
	is_reply: boolean;
	is_pinned: boolean;
	has_liked: boolean;
	has_retweeted: boolean;
	created_at: string;
};

export type TweetNode = {
	Tweet: TweetInfo;
	OriginalTweet?: TweetInfo;
	ParentReply?: TweetInfo;
	OmittedReplyExist?: boolean;
};

export type APITweetNode = {
	tweet: APITweetInfo;
	original_tweet?: APITweetInfo;
	parent_reply?: APITweetInfo;
	omitted_reply_exist?: boolean;
};
