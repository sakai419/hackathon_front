import { Profile } from "@/types/profile";
import { useState, useEffect } from "react";

const fetchUserProfiles = async (userId: string) => {
	await new Promise((resolve) => setTimeout(resolve, 500));
	return {
		userId: "user123",
		userName: "山田太郎",
		profileImageUrl: "/placeholder.svg?height=40&width=40",
		bannerImageUrl: "/placeholder.svg?height=200&width=800",
		bio: "こんにちは、山田太郎です！",
		followers: 100,
		following: 200,
		posts: 300,
	};
};

export default function useProfile(userId: string): {
	profile: Profile | null;
	loading: boolean;
	error: string | null;
} {
	const [profile, setProfileData] = useState<Profile | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const getProfileData = async () => {
			try {
				setLoading(true);
				const profile = await fetchUserProfiles(userId);
				setProfileData(profile);
			} catch (err) {
				setError("ユーザーデータの取得に失敗しました");
			} finally {
				setLoading(false);
			}
		};

		getProfileData();
	}, [userId]);

	return { profile, loading, error };
}
