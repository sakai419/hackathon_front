import { BLOCK_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function blockUser(userId: string) {
	try {
		const response = await sendRequestWithRetry({
			url: `${BLOCK_ENDPOINT}/${userId}`,
			method: "POST",
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}
