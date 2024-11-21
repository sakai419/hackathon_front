import transformKeysToCamelCase from "@/lib/utils/transformKeysToCamelCase";
import getUserTweets from "@/services/api/users/getUserTweets";
import { TweetNode } from "@/types/tweetInfo";
import { useEffect, useState } from "react";

export default function useUserTweets(userId: string) {
	const [tweets, setTweets] = useState<TweetNode[]>([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUserTweets = async () => {
			if (isLoading || !hasMore) return;
			setIsLoading(true);
			try {
				const data = await getUserTweets(userId, page);
				if (data) {
					if (data.length === 0) {
						setHasMore(false);
					} else {
						const camelCaseData =
							transformKeysToCamelCase<TweetNode[]>(data);
						setTweets((prev) => [...prev, ...camelCaseData]);
						if (camelCaseData.length < 10) {
							setHasMore(false);
						}
					}
				}
			} catch (error) {
				console.error(error);
				setError("ユーザーのツイートの取得に失敗しました");
			} finally {
				setIsLoading(false);
			}
		};
		fetchUserTweets();
	}, [userId, page]);

	const loadMore = () => {
		if (hasMore && !isLoading) {
			setPage((prev) => prev + 1);
		}
	};

	return { tweets, isLoading, hasMore, loadMore, error };
}
