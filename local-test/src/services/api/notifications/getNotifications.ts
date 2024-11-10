import { NOTIFICATION_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function getNotifications() {
	try {
		const response = await sendRequestWithRetry({
			url: `${NOTIFICATION_ENDPOINT}?limit=10&offset=0`,
			method: "GET",
		});
		return response.data;
	} catch (error) {
		console.error("Failed to fetch notifications:", error);
		return null;
	}
}
