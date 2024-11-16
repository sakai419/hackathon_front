import { USER_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function getUserTweets(userId: string) {
	try {
		const response = await sendRequestWithRetry({
			url: `${USER_ENDPOINT}/${userId}/tweets?limit=10&offset=0`,
			method: "GET",
		});
		return response.data;
	} catch (error) {
		console.error("Failed to fetch user tweets:", error);
		return null;
	}
}
