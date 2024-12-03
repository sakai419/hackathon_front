import { TWEET_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function handleLike(tweetId: number, hasLiked: boolean) {
	const method = hasLiked ? "DELETE" : "POST";
	try {
		const response = await sendRequestWithRetry({
			url: `${TWEET_ENDPOINT}/${tweetId}/like`,
			method: method,
		});
		return response.data;
	} catch (error) {
		console.log("Failed to handle like:", error);
		throw error;
	}
}
