import { ADMIN_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function getReportedUsers(page: number) {
	try {
		const offset = (page - 1) * 10;
		const response = await sendRequestWithRetry({
			url: `${ADMIN_ENDPOINT}/reports/users?limit=10&offset=${offset}`,
			method: "GET",
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}
