import { transformKeysToCamelCase } from "@/lib/utils/transformKeys";
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
	const [error, setError] = useState<unknown>(null);

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
				const data = await searchTweets(keyword, page, "popular");
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<TweetNode[]>(data);
					setResults((prev) => [...prev, ...camelCaseData]);
					if (camelCaseData.length === 0) {
						setHasMore(false);
					}
				} else {
					setHasMore(false);
				}
			} catch (error) {
				setError(error);
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
