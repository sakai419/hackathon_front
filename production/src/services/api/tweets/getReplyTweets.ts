import { TWEET_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function getReplyTweets(tweetId: number, page: number) {
	const offset = (page - 1) * 10;
	try {
		const response = await sendRequestWithRetry({
			url: `${TWEET_ENDPOINT}/${tweetId}/replies?limit=10&offset=${offset}`,
			method: "GET",
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}
