import { useState, useEffect, useRef } from "react";
import { transformKeysToCamelCase } from "@/lib/utils/transformKeys";
import { ReportedUserInfo } from "@/types/report";
import getReportedUsers from "@/services/api/admin/getReportedUsers";

export default function useReportedUsers() {
	const [users, setUsers] = useState<ReportedUserInfo[]>([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState(true);
	const [error, setError] = useState<unknown>(null);

	const isLoadingRef = useRef(isLoading);

	useEffect(() => {
		isLoadingRef.current = isLoading;
	}, [isLoading]);

	useEffect(() => {
		const fetchNotifications = async () => {
			if (isLoadingRef.current || !hasMore) return;
			try {
				setIsLoading(true);
				const data = await getReportedUsers(page);
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<ReportedUserInfo[]>(data);
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
		fetchNotifications();
	}, [page, hasMore]);

	const loadMore = () => {
		if (hasMore && !isLoading) {
			setPage((prev) => prev + 1);
		}
	};

	return {
		users,
		isLoading,
		hasMore,
		loadMore,
		error,
	};
}
