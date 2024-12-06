import { transformKeysToCamelCase } from "@/lib/utils/transformKeys";
import getUserTweets from "@/services/api/users/getUserTweets";
import { TweetNode } from "@/types/tweet";
import { useEffect, useRef, useState } from "react";

interface UseUserTweetsProps {
	userId: string;
}

export default function useUserTweets({ userId }: UseUserTweetsProps) {
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
				const data = await getUserTweets(userId, page);
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
	}, [userId, page, hasMore]);

	const loadMore = () => {
		if (hasMore && !isLoading) {
			setPage((prev) => prev + 1);
		}
	};

	return { tweets, isLoading, hasMore, loadMore, error };
}
