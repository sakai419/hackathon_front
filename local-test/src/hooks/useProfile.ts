import transformKeysToCamelCase from "@/lib/utils/transformKeysToCamelCase";
import getUserProfile from "@/services/api/users/getUserProfile";
import { Profile } from "@/types/profile";
import { useState, useEffect } from "react";

export default function useProfile(userId: string): {
	profile: Profile | null;
	loading: boolean;
	error: string | null;
} {
	const [profile, setProfile] = useState<Profile | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				setLoading(true);
				const data = await getUserProfile(userId);
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<Profile>(data);
					setProfile(camelCaseData);
				}
			} catch (err) {
				console.error(err);
				setError("ユーザーデータの取得に失敗しました");
			} finally {
				setLoading(false);
			}
		};

		fetchProfileData();
	}, [userId]);

	return { profile, loading, error };
}
