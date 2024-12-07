import { SIDEBAR_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function getRightSidebarInfo() {
	try {
		const response = await sendRequestWithRetry({
			url: `${SIDEBAR_ENDPOINT}/right`,
			method: "GET",
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}
