export type Profile = {
	userId: string;
	userName: string;
	profileImageUrl?: string;
	bannerImageUrl?: string;
	bio?: string;
	followers: number;
	following: number;
	posts: number;
};
