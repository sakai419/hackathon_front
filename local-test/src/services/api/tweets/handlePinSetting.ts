import { TWEET_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function handlePinSetting(
	tweetId: number,
	IsPinned: boolean
) {
	const method = IsPinned ? "DELETE" : "PATCH";
	try {
		const response = await sendRequestWithRetry({
			url: `${TWEET_ENDPOINT}/${tweetId}/pin`,
			method: method,
		});
		return response.data;
	} catch (error) {
		console.log("Failed to handle pin setting:", error);
		throw error;
	}
}
