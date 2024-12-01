import { Code, Media } from "@/types/tweet";
import { TWEET_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function postReply(
	tweetId: number,
	content?: string,
	code?: Code,
	media?: Media
) {
	try {
		const response = await sendRequestWithRetry({
			url: `${TWEET_ENDPOINT}/${tweetId}/reply`,
			method: "POST",
			data: JSON.stringify({
				content,
				code,
				media,
			}),
		});
		return response.data;
	} catch (error) {
		console.log("Failed to post reply:", error);
		throw error;
	}
}
