import { Code } from "@/types/tweet";
import { EXECUTE_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function executeCode(code: Code) {
	try {
		const response = await sendRequestWithRetry({
			url: `${EXECUTE_ENDPOINT}`,
			method: "POST",
			data: code,
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}
