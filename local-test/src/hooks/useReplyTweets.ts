import { transformKeysToCamelCase } from "@/lib/utils/transformKeys";
import getReplyTweets from "@/services/api/tweets/getReplyTweets";
import { TweetInfo } from "@/types/tweet";
import { useState, useEffect, useRef } from "react";

interface UseReplyTweetsProps {
	tweetId: number;
}

export default function useReplyTweets({ tweetId }: UseReplyTweetsProps) {
	const [replyTweets, setReplyTweets] = useState<TweetInfo[]>([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [error, setError] = useState<unknown>(null);

	const isLoadingRef = useRef(isLoading);

	useEffect(() => {
		isLoadingRef.current = isLoading;
	}, [isLoading]);

	useEffect(() => {
		const fetchReplyTweets = async () => {
			if (isLoadingRef.current || !hasMore) return;
			setIsLoading(true);
			try {
				const data = await getReplyTweets(tweetId, page);
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<TweetInfo[]>(data);
					setReplyTweets((prev) => [...prev, ...camelCaseData]);
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
		fetchReplyTweets();
	}, [tweetId, page, hasMore]);

	const loadMore = () => {
		if (hasMore && !isLoading) {
			setPage((prev) => prev + 1);
		}
	};

	return { replyTweets, isLoading, hasMore, loadMore, error };
}
