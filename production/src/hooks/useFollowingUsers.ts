import { transformKeysToCamelCase } from "@/lib/utils/transformKeys";
import getFollowingInfos from "@/services/api/follow/getFollowingInfos";
import { UserInfo } from "@/types/useInfo";
import { useState, useRef, useEffect } from "react";

interface UseFollowingUsersProps {
	userId: string;
}

export default function useFollowingUsers({ userId }: UseFollowingUsersProps) {
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
				const data = await getFollowingInfos(userId, page);
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<UserInfo[]>(data);
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
	}, [userId, page, hasMore]);

	const loadMore = () => {
		if (hasMore && !isLoading) {
			setPage((prev) => prev + 1);
		}
	};

	return { users, isLoading, hasMore, loadMore, error };
}
