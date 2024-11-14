import { TWEET_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

interface PostTweetRequest {
	content: string;
	code: string;
	mediaUrl?: string;
}

export default async function postTweet({
	content,
	code,
	mediaUrl,
}: PostTweetRequest) {
	let media = null;

	if (mediaUrl) {
		media = {
			url: mediaUrl,
			type: "image",
		};
	}

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
