import { USER_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function getUserProfile(userId: string) {
	try {
		const response = await sendRequestWithRetry({
			url: `${USER_ENDPOINT}/${userId}`,
			method: "GET",
		});
		return response.data;
	} catch (error) {
		console.error("Failed to fetch user profile:", error);
		return null;
	}
}
