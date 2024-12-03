import { UserInfo } from "./useInfo";

export type Profile = {
	userInfo: UserInfo;
	bannerImageUrl: string;
	tweetCount: number;
	followingCount: number;
	followerCount: number;
	isFollowed: boolean;
	createdAt: string;
};

export type EditProfileData = {
	userId: string;
	userName: string;
	bio: string;
	profileImageUrl: string;
	bannerImageUrl: string;
	isUploading?: boolean;
	uploadError?: string | null;
};
