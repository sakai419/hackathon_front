import getUserProfile from "@/services/api/users/getUserProfile";
import { Profile } from "@/types/profile";
import { UserInfo } from "@/types/useInfo";
import { useState, useEffect } from "react";

export default function useProfile(userId: string): {
	profile: Profile | null;
	loading: boolean;
	error: string | null;
} {
	const [profile, setProfileData] = useState<Profile | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				setLoading(true);
				const data = await getUserProfile(userId);
				const profile: Profile = {
					UserInfo: {
						UserId: data.user_info.user_id,
						UserName: data.user_info.user_name,
						ProfileImageUrl: data.user_info.profile_image_url,
						IsPrivate: data.user_info.is_private,
						IsAdmin: data.user_info.is_admin,
						Bio: data.user_info.bio,
					} as UserInfo,
					BannerImageUrl: data.banner_image_url,
					TweetCount: data.tweet_count,
					FollowerCount: data.follower_count,
					FollowingCount: data.following_count,
					IsFollowed: data.is_followed,
					CreatedAt: data.created_at,
				} as Profile;
				setProfileData(profile);
			} catch (err) {
				setError("ユーザーデータの取得に失敗しました");
			} finally {
				setLoading(false);
			}
		};

		fetchProfileData();
	}, [userId]);

	return { profile, loading, error };
}
