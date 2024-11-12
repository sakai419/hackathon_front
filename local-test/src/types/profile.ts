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

export type EditProfileData = {
	UserId: string;
	UserName: string;
	Bio: string;
	ProfileImageUrl: string;
	BannerImageUrl: string;
};
