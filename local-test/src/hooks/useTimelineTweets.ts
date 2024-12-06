import { transformKeysToCamelCase } from "@/lib/utils/transformKeys";
import getTimelineTweets from "@/services/api/tweets/getTimelineTweets";
import { TweetNode } from "@/types/tweet";
import { useEffect, useRef, useState } from "react";

export default function useTimelineTweets() {
	const [tweets, setTweets] = useState<TweetNode[]>([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [error, setError] = useState<unknown>(null);

	const isLoadingRef = useRef(isLoading);

	useEffect(() => {
		isLoadingRef.current = isLoading;
	}, [isLoading]);
	useEffect(() => {
		const fetchUserTweets = async () => {
			if (isLoadingRef.current || !hasMore) return;
			setIsLoading(true);
			try {
				const data = await getTimelineTweets(page);
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<TweetNode[]>(data);
					setTweets((prev) => [...prev, ...camelCaseData]);
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
		fetchUserTweets();
	}, [page, hasMore]);

	const loadMore = () => {
		if (hasMore && !isLoading) {
			setPage((prev) => prev + 1);
		}
	};

	return { tweets, isLoading, hasMore, loadMore, error };
}
