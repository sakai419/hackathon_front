import { TWEET_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function getTimelineTweets(page: number) {
	const offset = (page - 1) * 100;
	try {
		const response = await sendRequestWithRetry({
			url: `${TWEET_ENDPOINT}/timeline?limit=100&offset=${offset}`,
			method: "GET",
		});
		return response.data;
	} catch (error) {
		console.error("Failed to get timeline tweets:", error);
		throw error;
	}
}
