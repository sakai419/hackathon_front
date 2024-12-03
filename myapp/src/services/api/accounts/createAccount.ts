import { ACCOUNT_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function createAccount(userId: string, userName: string) {
	try {
		const response = await sendRequestWithRetry({
			url: `${ACCOUNT_ENDPOINT}`,
			method: "POST",
			data: JSON.stringify({
				user_id: userId,
				user_name: userName,
			}),
		});
		return response.data;
	} catch (error) {
		console.error("Failed to create account:", error);
		throw error;
	}
}
