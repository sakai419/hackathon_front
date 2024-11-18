import { APIUserInfo, UserInfo } from "./useInfo";

export type Profile = {
	UserInfo: UserInfo;
	BannerImageUrl: string;
	TweetCount: number;
	FollowingCount: number;
	FollowerCount: number;
	IsFollowed: boolean;
	CreatedAt: string;
};

export type APIProfile = {
	user_info: APIUserInfo;
	banner_image_url: string;
	tweet_count: number;
	following_count: number;
	follower_count: number;
	is_followed: boolean;
	created_at: string;
};

export type EditProfileData = {
	UserId: string;
	UserName: string;
	Bio: string;
	ProfileImageUrl: string;
	BannerImageUrl: string;
	isUploading?: boolean;
	uploadError?: string | null;
};
