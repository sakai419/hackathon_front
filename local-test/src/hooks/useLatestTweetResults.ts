import { setDefaultImageOfTweetNodes } from "@/lib/utils/setDefaultImage";
import transformKeysToCamelCase from "@/lib/utils/transformKeysToCamelCase";
import searchTweets from "@/services/api/search/searchTweets";
import { TweetNode } from "@/types/tweet";
import { useEffect, useRef, useState } from "react";

interface UseLatestTweetResultsProps {
	keyword: string;
}

export default function useLatestTweetResults({
	keyword,
}: UseLatestTweetResultsProps) {
	const [results, setResults] = useState<TweetNode[]>([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const isLoadingRef = useRef(isLoading);

	useEffect(() => {
		isLoadingRef.current = isLoading;
	}, [isLoading]);

	useEffect(() => {
		setResults([]);
		setPage(1);
		setHasMore(true);
	}, [keyword]);

	useEffect(() => {
		const fetchUserResults = async () => {
			if (isLoadingRef.current || !hasMore || !keyword) return;
			setIsLoading(true);
			try {
				const data = await searchTweets(keyword, page, "latest");
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<TweetNode[]>(data);
					setDefaultImageOfTweetNodes(camelCaseData);
					setResults((prev) => [...prev, ...camelCaseData]);
					if (camelCaseData.length < 10) {
						setHasMore(false);
					}
				} else {
					setHasMore(false);
				}
			} catch (error) {
				console.error(error);
				setError("ユーザーの検索に失敗しました");
			} finally {
				setIsLoading(false);
			}
		};
		fetchUserResults();
	}, [keyword, page, hasMore]);

	const loadMore = () => {
		if (hasMore && !isLoading) {
			setPage((prev) => prev + 1);
		}
	};

	return { results, isLoading, hasMore, loadMore, error };
}
