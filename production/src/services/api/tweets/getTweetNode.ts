import { TWEET_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function getTweetNode(tweetId: number) {
	try {
		const response = await sendRequestWithRetry({
			url: `${TWEET_ENDPOINT}/${tweetId}`,
			method: "GET",
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}
