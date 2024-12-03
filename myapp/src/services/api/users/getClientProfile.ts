import { USER_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function getClientProfile() {
	try {
		const response = await sendRequestWithRetry({
			url: `${USER_ENDPOINT}/me`,
			method: "GET",
		});
		return response.data;
	} catch (error) {
		console.error("Failed to fetch client profile:", error);
		return null;
	}
}
