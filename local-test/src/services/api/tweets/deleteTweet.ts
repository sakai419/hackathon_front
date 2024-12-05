import { TWEET_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function deleteTweet(tweetId: number) {
	try {
		const response = await sendRequestWithRetry({
			url: `${TWEET_ENDPOINT}/${tweetId}`,
			method: "DELETE",
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}
