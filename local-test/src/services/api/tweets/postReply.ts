import { Code, Media } from "@/types/tweetInfo";
import { TWEET_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

interface PostReplyRequest {
	tweetId: number;
	content?: string;
	code?: Code;
	media?: Media;
}

export default async function postReply({
	tweetId,
	content,
	code,
	media,
}: PostReplyRequest) {
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
