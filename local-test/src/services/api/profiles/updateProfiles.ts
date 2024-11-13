import { EditProfileData } from "@/types/profile";
import { PROFILE_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";
import { AxiosError } from "axios";

interface updateProfilesProps {
	data: EditProfileData;
}

export default async function updateProfiles({ data }: updateProfilesProps) {
	try {
		const response = await sendRequestWithRetry({
			url: `${PROFILE_ENDPOINT}`,
			method: "PATCH",
			data: JSON.stringify({
				user_id: data.UserId,
				user_name: data.UserName,
				bio: data.Bio,
				profile_image_url: data.ProfileImageUrl,
				banner_image_url: data.BannerImageUrl,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error: AxiosError | any) {
		console.error("Failed to update profiles:", error);
		if (error instanceof AxiosError) {
			throw new Error(
				error.response?.data?.message || "An unexpected error occurred."
			);
		} else {
			throw new Error("An unexpected error occurred.");
		}
	}
}
