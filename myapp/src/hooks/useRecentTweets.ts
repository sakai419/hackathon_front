import { setDefaultImageOfTweetNodes } from "@/lib/utils/setDefaultImage";
import { transformKeysToCamelCase } from "@/lib/utils/transformKeys";
import getRecentTweets from "@/services/api/tweets/getRecentTweets";
import { TweetNode } from "@/types/tweet";
import { useEffect, useRef, useState } from "react";

export default function useRecentTweets() {
	const [tweets, setTweets] = useState<TweetNode[]>([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const isLoadingRef = useRef(isLoading);

	useEffect(() => {
		isLoadingRef.current = isLoading;
	}, [isLoading]);
	useEffect(() => {
		const fetchUserTweets = async () => {
			if (isLoadingRef.current || !hasMore) return;
			setIsLoading(true);
			try {
				const data = await getRecentTweets(page);
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<TweetNode[]>(data);
					setDefaultImageOfTweetNodes(camelCaseData);
					setTweets((prev) => [...prev, ...camelCaseData]);
					if (camelCaseData.length < 100) {
						setHasMore(false);
					}
				} else {
					setHasMore(false);
				}
			} catch (error) {
				console.error(error);
				setError("ユーザーのツイートの取得に失敗しました");
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
