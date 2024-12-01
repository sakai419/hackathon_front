import { TWEET_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

interface deleteTweetRequest {
	tweetId: number;
}

export default async function deleteTweet({ tweetId }: deleteTweetRequest) {
	try {
		const response = await sendRequestWithRetry({
			url: `${TWEET_ENDPOINT}/${tweetId}`,
			method: "DELETE",
		});
		return response.data;
	} catch (error) {
		console.error("Failed to delete tweet:", error);
		throw error;
	}
}
