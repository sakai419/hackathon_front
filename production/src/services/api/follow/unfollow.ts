import { FOLLOW_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function unfollow(userId: string) {
	try {
		const response = await sendRequestWithRetry({
			url: `${FOLLOW_ENDPOINT}/${userId}`,
			method: "DELETE",
		});
		return response.data;
	} catch (error) {
		console.error("Failed to unfollow user:", error);
		return null;
	}
}
