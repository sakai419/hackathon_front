import { CONVERSATION_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function getMessages(userId: string, page: number) {
	const offset = (page - 1) * 10;
	try {
		const response = await sendRequestWithRetry({
			url: `${CONVERSATION_ENDPOINT}/${userId}/messages?limit=10&offset=${offset}`,
			method: "GET",
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}
