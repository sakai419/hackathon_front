import { setDefaultImageOfTweetNodes } from "@/lib/utils/setDefaultImage";
import transformKeysToCamelCase from "@/lib/utils/transformKeysToCamelCase";
import getUserLikes from "@/services/api/users/getUserLikes";
import { TweetNode } from "@/types/tweet";
import { useState, useRef, useEffect } from "react";

export default function useUserLikes(userId: string) {
	const [likes, setLikes] = useState<TweetNode[]>([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const isLoadingRef = useRef(isLoading);

	useEffect(() => {
		isLoadingRef.current = isLoading;
	}, [isLoading]);

	useEffect(() => {
		const fetchUserLikes = async () => {
			if (isLoadingRef.current || !hasMore) return;
			setIsLoading(true);
			try {
				const data = await getUserLikes(userId, page);
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<TweetNode[]>(data);
					setDefaultImageOfTweetNodes(camelCaseData);
					setLikes((prev) => [...prev, ...camelCaseData]);
					if (camelCaseData.length < 10) {
						setHasMore(false);
					}
				} else {
					setHasMore(false);
				}
			} catch (error) {
				console.error(error);
				setError("ユーザーのいいねの取得に失敗しました");
			} finally {
				setIsLoading(false);
			}
		};
		fetchUserLikes();
	}, [userId, page, hasMore]);

	const loadMore = () => {
		if (hasMore && !isLoading) {
			setPage((prev) => prev + 1);
		}
	};

	return { likes, isLoading, hasMore, loadMore, error };
}
