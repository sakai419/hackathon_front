import { transformKeysToCamelCase } from "@/lib/utils/transformKeys";
import searchUsers from "@/services/api/search/searchUsers";
import { UserInfo } from "@/types/useInfo";
import { useEffect, useRef, useState } from "react";

interface UseUserResultsProps {
	keyword: string;
}

export default function useUserResults({ keyword }: UseUserResultsProps) {
	const [results, setResults] = useState<UserInfo[]>([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [error, setError] = useState<unknown>(null);

	const isLoadingRef = useRef(isLoading);

	useEffect(() => {
		isLoadingRef.current = isLoading;
	}, [isLoading]);

	useEffect(() => {
		setResults([]);
		setPage(1);
		setHasMore(true);
	}, [keyword]);

	useEffect(() => {
		const fetchUserResults = async () => {
			if (isLoadingRef.current || !hasMore || !keyword) return;
			setIsLoading(true);
			try {
				const data = await searchUsers(keyword, page, "latest");
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<UserInfo[]>(data);
					setResults((prev) => [...prev, ...camelCaseData]);
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
	}, [keyword, page, hasMore]);

	const loadMore = () => {
		if (hasMore && !isLoading) {
			setPage((prev) => prev + 1);
		}
	};

	return { results, isLoading, hasMore, loadMore, error };
}
