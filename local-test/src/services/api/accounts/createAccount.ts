import { ACCOUNT_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

interface CreateAccountRequest {
	userId: string;
	userName: string;
}

export default async function createAccount({
	userId,
	userName,
}: CreateAccountRequest) {
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
