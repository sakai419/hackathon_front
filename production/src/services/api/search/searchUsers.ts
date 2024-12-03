import { SortType } from "@/types/search";
import { SEARCH_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";

export default async function searchUsers(
	keyword: string,
	page: number,
	sortType: SortType
) {
	const offset = (page - 1) * 10;
	try {
		const response = await sendRequestWithRetry({
			url: `${SEARCH_ENDPOINT}/users?keyword=${keyword}&limit=10&offset=${offset}&sort_type=${sortType}`,
			method: "GET",
		});
		return response.data;
	} catch (error) {
		console.error("Failed to search users:", error);
		throw error;
	}
}
