import { Code, Media } from "@/types/tweet";
import { TWEET_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

interface PostQuoteRequest {
	tweetId: number;
	content?: string;
	code?: Code;
	media?: Media;
}

export default async function postQuote({
	tweetId,
	content,
	code,
	media,
}: PostQuoteRequest) {
	try {
		const response = await sendRequestWithRetry({
			url: `${TWEET_ENDPOINT}/${tweetId}/quote`,
			method: "POST",
			data: JSON.stringify({
				content,
				code,
				media,
			}),
		});
		return response.data;
	} catch (error) {
		console.log("Failed to post quote:", error);
		throw error;
	}
}
