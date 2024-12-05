import { CONVERSATION_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function sendMessage(userId: string, message: string) {
	try {
		const response = await sendRequestWithRetry({
			url: `${CONVERSATION_ENDPOINT}/${userId}/messages`,
			method: "POST",
			data: JSON.stringify({ content: message }),
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}
