export type UserInfo = {
	UserId: string;
	UserName: string;
	ProfileImageUrl: string;
	IsPrivate: boolean;
	IsAdmin: boolean;
	Bio: string;
};

export type APIUserInfo = {
	user_id: string;
	user_name: string;
	profile_image_url: string;
	is_private: boolean;
	is_admin: boolean;
	bio: string;
};
