import { TWEET_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

interface getTweetNodeRequest {
	tweetId: number;
}

export default async function getTweetNode({ tweetId }: getTweetNodeRequest) {
	try {
		const response = await sendRequestWithRetry({
			url: `${TWEET_ENDPOINT}/${tweetId}`,
			method: "GET",
		});
		return response.data;
	} catch (error) {
		console.error("Failed to get tweet node:", error);
		throw error;
	}
}
