import { REPORT_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function createReport(
	userId: string,
	reason: string,
	content?: string
) {
	try {
		const response = await sendRequestWithRetry({
			url: `${REPORT_ENDPOINT}/${userId}`,
			method: "POST",
			data: JSON.stringify({
				reason,
				content,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}
