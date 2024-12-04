import { FOLLOW_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function getFollowerInfos(userId: string, page: number) {
	const offset = (page - 1) * 10;
	try {
		const response = await sendRequestWithRetry({
			url: `${FOLLOW_ENDPOINT}/followers/${userId}?limit=10&offset=${offset}`,
			method: "GET",
		});
		return response.data;
	} catch (error) {
		console.error("Failed to get following users:", error);
		return null;
	}
}
