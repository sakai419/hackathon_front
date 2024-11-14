import { UserInfoWithoutBio } from "./userInfoWithoutBio";

export type MediaTypes = "image" | "video";

export type Media = {
	type: MediaTypes;
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
