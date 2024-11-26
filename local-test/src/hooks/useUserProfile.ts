import { setDefaultImageOfProfile } from "@/lib/utils/setDefaultImage";
import transformKeysToCamelCase from "@/lib/utils/transformKeysToCamelCase";
import getUserProfile from "@/services/api/users/getUserProfile";
import { Profile } from "@/types/profile";
import { useState, useEffect } from "react";

export default function useUserProfile(userId: string) {
	const [profile, setProfile] = useState<Profile | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				setIsLoading(true);
				const data = await getUserProfile(userId);
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<Profile>(data);
					setDefaultImageOfProfile(camelCaseData);
					setProfile(camelCaseData);
				}
			} catch (error) {
				console.error(error);
				setError("ユーザーデータの取得に失敗しました");
			} finally {
				setIsLoading(false);
			}
		};

		fetchProfileData();
	}, [userId]);

	return { profile, isLoading, error };
}
