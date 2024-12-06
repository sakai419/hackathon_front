import { BLOCK_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function getBlockedUsers(page: number) {
	const offset = (page - 1) * 10;
	try {
		const response = await sendRequestWithRetry({
			url: `${BLOCK_ENDPOINT}?limit=10&offset=${offset}`,
			method: "GET",
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}
