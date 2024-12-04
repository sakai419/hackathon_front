import { Settings } from "@/types/settings";
import { SETTINGS_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";
import { transformKeysToSnakeCase } from "@/lib/utils/transformKeys";

export default async function updateSettings(settings: Settings) {
	try {
		const response = await sendRequestWithRetry({
			url: `${SETTINGS_ENDPOINT}`,
			method: "PATCH",
			data: JSON.stringify(transformKeysToSnakeCase(settings)),
		});
		return response.data;
	} catch (error) {
		console.log("Failed to update settings:", error);
		throw error;
	}
}
