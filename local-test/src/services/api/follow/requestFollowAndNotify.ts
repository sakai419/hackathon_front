import { FOLLOW_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function requestFollowAndNotify(userId: string) {
	try {
		const response = await sendRequestWithRetry({
			url: `${FOLLOW_ENDPOINT}/requests/${userId}`,
			method: "POST",
		});
		return response.data;
	} catch (error) {
		console.error("Failed to follow user:", error);
		return null;
	}
}
