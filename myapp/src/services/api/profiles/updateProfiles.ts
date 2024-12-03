import { EditProfileData } from "@/types/profile";
import { PROFILE_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";
import { transformKeysToSnakeCase } from "@/lib/utils/transformKeys";

export default async function updateProfiles(data: EditProfileData) {
	try {
		console.log("data", data);
		const response = await sendRequestWithRetry({
			url: `${PROFILE_ENDPOINT}`,
			method: "PATCH",
			data: JSON.stringify(transformKeysToSnakeCase(data)),
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
