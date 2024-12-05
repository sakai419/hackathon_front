import { FOLLOW_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function acceptFollowRequestAndNotify(userId: string) {
	try {
		const response = await sendRequestWithRetry({
			url: `${FOLLOW_ENDPOINT}/requests/received/${userId}/accept`,
			method: "PATCH",
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}
