import { EditProfileData } from "@/types/profile";
import { PROFILE_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

interface updateProfilesProps {
	data: EditProfileData;
}

export default async function updateProfiles({ data }: updateProfilesProps) {
	try {
		const response = await sendRequestWithRetry({
			url: `${PROFILE_ENDPOINT}`,
			method: "PATCH",
			data: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error: unknown) {
		console.error("Failed to update profiles:", error);
		throw error;
	}
}
