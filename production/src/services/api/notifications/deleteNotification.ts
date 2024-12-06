import { NOTIFICATION_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function deleteNotification(notificationId: number) {
	try {
		const response = await sendRequestWithRetry({
			url: `${NOTIFICATION_ENDPOINT}/${notificationId}`,
			method: "DELETE",
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}
