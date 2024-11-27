import { TWEET_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

interface handleRetweetRequest {
	tweetId: number;
	hasRetweeted: boolean;
}

export default async function handleRetweet({
	tweetId,
	hasRetweeted,
}: handleRetweetRequest) {
	const method = hasRetweeted ? "DELETE" : "POST";
	try {
		const response = await sendRequestWithRetry({
			url: `${TWEET_ENDPOINT}/${tweetId}/retweet`,
			method: method,
		});
		return response.data;
	} catch (error) {
		console.log("Failed to handle retweet:", error);
		throw error;
	}
}
