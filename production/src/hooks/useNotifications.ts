import getNotifications from "@/services/api/notifications/getNotifications";
import { useState, useEffect, useRef } from "react";
import { Notification } from "@/types/notification";
import { transformKeysToCamelCase } from "@/lib/utils/transformKeys";

export default function useNotifications() {
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const isLoadingRef = useRef(isLoading);

	useEffect(() => {
		isLoadingRef.current = isLoading;
	}, [isLoading]);

	useEffect(() => {
		const fetchNotifications = async () => {
			if (isLoadingRef.current || !hasMore) return;
			try {
				setIsLoading(true);
				const data = await getNotifications(page);
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<Notification[]>(data);
					setNotifications((prev) => [...prev, ...camelCaseData]);
					if (camelCaseData.length < 10) {
						setHasMore(false);
					}
				} else {
					setHasMore(false);
				}
			} catch (error) {
				console.error(error);
				setError("Failed to fetch notifications");
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
		notifications,
		isLoading,
		hasMore,
		loadMore,
		error,
	};
}
