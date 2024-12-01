import { TWEET_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

interface getReplyTweetsRequest {
	tweetId: number;
	page: number;
}

export default async function getReplyTweets({
	tweetId,
	page,
}: getReplyTweetsRequest) {
	const offset = (page - 1) * 10;
	try {
		const response = await sendRequestWithRetry({
			url: `${TWEET_ENDPOINT}/${tweetId}/replies?limit=10&offset=${offset}`,
			method: "GET",
		});
		return response.data;
	} catch (error) {
		console.error("Failed to get reply tweets:", error);
		throw error;
	}
}
