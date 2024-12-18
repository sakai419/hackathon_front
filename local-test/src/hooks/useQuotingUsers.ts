import { transformKeysToCamelCase } from "@/lib/utils/transformKeys";
import getQuotingUserInfos from "@/services/api/tweets/getQuotingUserInfos";
import { UserInfo } from "@/types/useInfo";
import { useState, useEffect, useRef } from "react";

interface UseQuotingUsersProps {
	tweetId: number;
}

export default function useQuotingUsers({ tweetId }: UseQuotingUsersProps) {
	const [users, setUsers] = useState<UserInfo[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<unknown>(null);

	const isLoadingRef = useRef(isLoading);

	useEffect(() => {
		isLoadingRef.current = isLoading;
	}, [isLoading]);

	useEffect(() => {
		const fetchUserResults = async () => {
			if (isLoadingRef.current || !hasMore) return;
			setIsLoading(true);
			try {
				const data = await getQuotingUserInfos(tweetId, page);
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<UserInfo[]>(data);
					setUsers((prev) => [...prev, ...camelCaseData]);
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
	}, [tweetId, page, hasMore]);

	const loadMore = () => {
		if (hasMore && !isLoading) {
			setPage((prev) => prev + 1);
		}
	};

	return { users, isLoading, hasMore, loadMore, error };
}
