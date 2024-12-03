import { TWEET_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function getRecentLabels() {
	try {
		const response = await sendRequestWithRetry({
			url: `${TWEET_ENDPOINT}/recent/labels?limit=100`,
			method: "GET",
		});
		return response.data;
	} catch (error) {
		console.error("Failed to get recent labels:", error);
		throw error;
	}
}
