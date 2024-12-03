import { USER_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function getUserLikes(userId: string, page: number) {
	try {
		const offset = (page - 1) * 10;
		const response = await sendRequestWithRetry({
			url: `${USER_ENDPOINT}/${userId}/likes?limit=10&offset=${offset}`,
			method: "GET",
		});
		return response.data;
	} catch (error) {
		console.error("Failed to fetch user likes:", error);
		return null;
	}
}
