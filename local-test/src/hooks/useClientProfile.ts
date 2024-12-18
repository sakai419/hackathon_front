import { transformKeysToCamelCase } from "@/lib/utils/transformKeys";
import getClientProfile from "@/services/api/users/getClientProfile";
import { Profile } from "@/types/profile";
import { useEffect, useState } from "react";

export default function useClientProfile() {
	const [profile, setProfile] = useState<Profile | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<unknown>(null);

	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				const data = await getClientProfile();
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
	}, []);

	return { profile, isLoading, error };
}
