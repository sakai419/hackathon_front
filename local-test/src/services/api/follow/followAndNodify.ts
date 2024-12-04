import { FOLLOW_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function followAndNodify(userId: string) {
	try {
		const response = await sendRequestWithRetry({
			url: `${FOLLOW_ENDPOINT}/${userId}`,
			method: "POST",
		});
		return response.data;
	} catch (error) {
		console.error("Failed to follow user:", error);
		return null;
	}
}
