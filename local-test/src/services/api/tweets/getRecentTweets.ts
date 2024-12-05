import { TWEET_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function getRecentTweets(page: number) {
	const offset = (page - 1) * 10;
	try {
		const response = await sendRequestWithRetry({
			url: `${TWEET_ENDPOINT}/recent?limit=10&offset=${offset}`,
			method: "GET",
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}
