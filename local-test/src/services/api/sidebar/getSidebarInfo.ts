import { SIDEBAR_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function getSidebarInfo() {
	try {
		const response = await sendRequestWithRetry({
			url: SIDEBAR_ENDPOINT,
			method: "GET",
		});
		return response.data;
	} catch (error) {
		console.error("Failed to fetch sidebar info:", error);
		return null;
	}
}
