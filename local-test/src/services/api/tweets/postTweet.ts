import { Code, Media } from "@/types/tweetInfo";
import { TWEET_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

interface PostTweetRequest {
	content: string;
	code?: Code;
	media?: Media;
}

export default async function postTweet({
	content,
	code,
	media,
}: PostTweetRequest) {
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
