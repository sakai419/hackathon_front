import { SortType } from "@/types/search";
import { SEARCH_ENDPOINT } from "../apiConfig";
import { sendRequestWithRetry } from "../requests";
import { Label } from "@/types/label";

export default async function searchTweets(
	keyword: string,
	label: Label,
	hashtag: string,
	page: number,
	sortType: SortType
) {
	const offset = (page - 1) * 10;
	try {
		const response = await sendRequestWithRetry({
			url: `${SEARCH_ENDPOINT}/tweets?keyword=${keyword}&label=${label}&hashtag=${hashtag}&limit=10&offset=${offset}&sort_type=${sortType}`,
			method: "GET",
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}
