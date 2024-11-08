import { UserInfoWithoutBio } from "./userInfoWithoutBio";

type Media = {
	type: string;
	url: string;
};

export type TweetInfo = {
	TweetID: number;
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
