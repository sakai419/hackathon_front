import { transformKeysToCamelCase } from "@/lib/utils/transformKeys";
import getUserRetweets from "@/services/api/users/getUserRetweets";
import { TweetNode } from "@/types/tweet";
import { useEffect, useRef, useState } from "react";

interface UseUserRetweetsProps {
	userId: string;
}

export default function useUserRetweets({ userId }: UseUserRetweetsProps) {
	const [retweets, setRetweets] = useState<TweetNode[]>([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [error, setError] = useState<unknown>(null);

	const isLoadingRef = useRef(isLoading);

	useEffect(() => {
		isLoadingRef.current = isLoading;
	}, [isLoading]);

	useEffect(() => {
		const fetchUserRetweets = async () => {
			if (isLoadingRef.current || !hasMore) return;
			setIsLoading(true);
			try {
				const data = await getUserRetweets(userId, page);
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<TweetNode[]>(data);
					setRetweets((prev) => [...prev, ...camelCaseData]);
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
		fetchUserRetweets();
	}, [userId, page, hasMore]);

	const loadMore = () => {
		if (hasMore && !isLoading) {
			setPage((prev) => prev + 1);
		}
	};

	return { retweets, isLoading, hasMore, loadMore, error };
}
