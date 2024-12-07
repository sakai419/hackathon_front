import { SIDEBAR_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function getLeftSidebarInfo() {
	try {
		const response = await sendRequestWithRetry({
			url: `${SIDEBAR_ENDPOINT}/left`,
			method: "GET",
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}
