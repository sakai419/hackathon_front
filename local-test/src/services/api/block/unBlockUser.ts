import { BLOCK_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function unBlockUser(userId: string) {
	try {
		const response = await sendRequestWithRetry({
			url: `${BLOCK_ENDPOINT}/${userId}`,
			method: "DELETE",
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}
