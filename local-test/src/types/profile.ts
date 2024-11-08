import { UserInfo } from "./useInfo";

export type Profile = {
	UserInfo: UserInfo;
	BannerImageUrl: string;
	TweetCount: number;
	FollowingCount: number;
	FollowerCount: number;
	IsFollowed: boolean;
	CreatedAt: string;
};
