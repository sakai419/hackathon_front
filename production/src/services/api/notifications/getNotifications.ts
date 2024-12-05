import { NOTIFICATION_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function getNotifications(page: number) {
	try {
		const offset = (page - 1) * 10;
		const response = await sendRequestWithRetry({
			url: `${NOTIFICATION_ENDPOINT}?limit=10&offset=${offset}`,
			method: "GET",
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}
