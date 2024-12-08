import { useEffect, useRef, useState } from "react";
import { Report } from "@/types/report";
import getReportsOfUser from "@/services/api/admin/getReportsOfUser";
import { transformKeysToCamelCase } from "@/lib/utils/transformKeys";

export default function useUserReports(userId: string) {
	const [reports, setReports] = useState<Report[]>([]);
	const [page, setPage] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [error, setError] = useState<unknown>(null);

	const isLoadingRef = useRef(isLoading);

	useEffect(() => {
		isLoadingRef.current = isLoading;
	}, [isLoading]);

	useEffect(() => {
		const fetchReports = async () => {
			if (isLoadingRef.current || !hasMore) return;
			try {
				setIsLoading(true);
				const data = await getReportsOfUser(userId, page);
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<Report[]>(data);
					setReports((prev) => [...prev, ...camelCaseData]);
					if (data.length === 0) {
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
		fetchReports();
	}, [userId, page, hasMore]);

	const loadMore = () => {
		if (hasMore && !isLoading) {
			setPage((prev) => prev + 1);
		}
	};

	return {
		reports,
		isLoading,
		hasMore,
		loadMore,
		error,
	};
}
