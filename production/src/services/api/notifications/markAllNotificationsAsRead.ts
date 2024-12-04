import { NOTIFICATION_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function markAllNotificationsAsRead() {
	try {
		const response = await sendRequestWithRetry({
			url: `${NOTIFICATION_ENDPOINT}/read/all`,
			method: "PATCH",
		});
		return response.data;
	} catch (error) {
		console.error("Failed to mark all notifications as read:", error);
		return null;
	}
}
