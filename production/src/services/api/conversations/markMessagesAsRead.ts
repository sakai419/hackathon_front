import { CONVERSATION_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function markMessagesAsRead(userId: string) {
	try {
		const response = await sendRequestWithRetry({
			url: `${CONVERSATION_ENDPOINT}/${userId}/messages/read`,
			method: "PATCH",
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}
