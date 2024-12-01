import { Code, Media } from "@/types/tweet";
import { TWEET_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function postTweet(
	content?: string,
	code?: Code,
	media?: Media
) {
	try {
		const response = await sendRequestWithRetry({
			url: `${TWEET_ENDPOINT}`,
			method: "POST",
			data: JSON.stringify({
				content,
				code,
				media,
			}),
		});
		return response.data;
	} catch (error) {
		console.log("Failed to post tweet:", error);
		throw error;
	}
}
