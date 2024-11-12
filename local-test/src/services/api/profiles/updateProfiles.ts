import { PROFILE_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

interface updateProfilesProps {
	userId: string;
	userName: string;
	bio: string;
	profileImageUrl: string;
	bannerImageUrl: string;
}

export default async function updateProfiles({
	userId,
	userName,
	bio,
	profileImageUrl,
	bannerImageUrl,
}: updateProfilesProps) {
	try {
		const response = await sendRequestWithRetry({
			url: `${PROFILE_ENDPOINT}`,
			method: "PATCH",
			data: JSON.stringify({
				user_id: userId,
				user_name: userName,
				bio: bio,
				profile_image_url: profileImageUrl,
				banner_image_url: bannerImageUrl,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Failed to update profiles:", error);
		return null;
	}
}
