import { setDefaultImageOfUserInfos } from "@/lib/utils/setDefaultImage";
import { transformKeysToCamelCase } from "@/lib/utils/transformKeys";
import getRetweetingUserInfos from "@/services/api/tweets/getRetweetingUserInfos";
import { UserInfo } from "@/types/useInfo";
import { useState, useEffect, useRef } from "react";

interface UseRetweetingUsersProps {
	tweetId: number;
}

export default function useRetweetingUsers({
	tweetId,
}: UseRetweetingUsersProps) {
	const [users, setUsers] = useState<UserInfo[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const isLoadingRef = useRef(isLoading);

	useEffect(() => {
		isLoadingRef.current = isLoading;
	}, [isLoading]);

	useEffect(() => {
		const fetchUserResults = async () => {
			if (isLoadingRef.current || !hasMore) return;
			setIsLoading(true);
			try {
				const data = await getRetweetingUserInfos(tweetId, page);
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<UserInfo[]>(data);
					setDefaultImageOfUserInfos(camelCaseData);
					setUsers((prev) => [...prev, ...camelCaseData]);
					if (camelCaseData.length < 10) {
						setHasMore(false);
					}
				} else {
					setHasMore(false);
				}
			} catch (error) {
				console.error(error);
				setError("ユーザーの取得に失敗しました");
			} finally {
				setIsLoading(false);
			}
		};
		fetchUserResults();
	}, [tweetId, page, hasMore]);

	const loadMore = () => {
		if (hasMore && !isLoading) {
			setPage((prev) => prev + 1);
		}
	};

	return { users, isLoading, hasMore, loadMore, error };
}
