import { setDefaultImageOfUserInfos } from "@/lib/utils/setDefaultImage";
import transformKeysToCamelCase from "@/lib/utils/transformKeysToCamelCase";
import searchUsers from "@/services/api/search/searchUsers";
import { UserInfo } from "@/types/useInfo";
import { useEffect, useRef, useState } from "react";

interface UserResultsProps {
	keyword: string;
}

export default function UserResults({ keyword }: UserResultsProps) {
	const [results, setResults] = useState<UserInfo[]>([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [error, setError] = useState<string | null>(null);

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
				const data = await searchUsers(keyword, page);
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<UserInfo[]>(data);
					setDefaultImageOfUserInfos(camelCaseData);
					setResults((prev) => [...prev, ...camelCaseData]);
					if (camelCaseData.length < 10) {
						setHasMore(false);
					}
				} else {
					setHasMore(false);
				}
			} catch (error) {
				console.error(error);
				setError("ユーザーの検索に失敗しました");
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
