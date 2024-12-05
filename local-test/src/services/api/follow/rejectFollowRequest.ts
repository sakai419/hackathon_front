import { FOLLOW_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function rejectFollowRequest(userId: string) {
	try {
		const response = await sendRequestWithRetry({
			url: `${FOLLOW_ENDPOINT}/requests/received/${userId}`,
			method: "DELETE",
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}
