import { transformKeysToCamelCase } from "@/lib/utils/transformKeys";
import { validateLabel } from "@/lib/utils/validation";
import searchTweets from "@/services/api/search/searchTweets";
import { Label } from "@/types/label";
import { TweetNode } from "@/types/tweet";
import { useEffect, useRef, useState } from "react";

interface UseLatestTweetResultsProps {
	keyword: string;
	label: string;
}

export default function useLatestTweetResults({
	keyword,
	label,
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
			if (
				isLoadingRef.current ||
				!hasMore ||
				(!keyword && !label) ||
				(label && !validateLabel(label))
			)
				return;
			setIsLoading(true);
			try {
				const data = await searchTweets(
					keyword,
					label as Label,
					page,
					"latest"
				);
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
	}, [keyword, label, page, hasMore]);

	const loadMore = () => {
		if (hasMore && !isLoading) {
			setPage((prev) => prev + 1);
		}
	};

	return { results, isLoading, hasMore, loadMore, error };
}
