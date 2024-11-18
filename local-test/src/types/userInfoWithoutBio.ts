export type UserInfoWithoutBio = {
	UserId: string;
	UserName: string;
	ProfileImageUrl: string;
	IsPrivate: boolean;
	IsAdmin: boolean;
};

export type APIUserInfoWithoutBio = {
	user_id: string;
	user_name: string;
	profile_image_url: string;
	is_private: boolean;
	is_admin: boolean;
};
