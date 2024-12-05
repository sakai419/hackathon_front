import { transformKeysToCamelCase } from "@/lib/utils/transformKeys";
import getUserProfile from "@/services/api/users/getUserProfile";
import { Profile } from "@/types/profile";
import { useState, useEffect } from "react";

interface UseUserProfileProps {
	userId: string;
}

export default function useUserProfile({ userId }: UseUserProfileProps) {
	const [profile, setProfile] = useState<Profile | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<unknown>(null);

	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				setIsLoading(true);
				const data = await getUserProfile(userId);
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<Profile>(data);
					setProfile(camelCaseData);
				}
			} catch (error) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProfileData();
	}, [userId]);

	return { profile, isLoading, error };
}
