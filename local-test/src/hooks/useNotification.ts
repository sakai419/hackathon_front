import getNotifications from "@/services/api/notifications/getNotifications";
import { useState, useEffect } from "react";
import { Notification } from "@/types/notification";
import transformKeysToCamelCase from "@/lib/utils/transformKeysToCamelCase";

export default function useNotifications() {
	const [notifications, setNotifications] = useState<Notification[] | null>(
		[]
	);
	const [isLoading, setisLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		const fetchNotifications = async () => {
			try {
				setisLoading(true);
				const data = await getNotifications();
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<Notification[]>(data);
					setNotifications(camelCaseData);
				}
			} catch (error) {
				console.error(error);
				setError("Failed to fetch notifications");
			} finally {
				setisLoading(false);
			}
		};
		fetchNotifications();
	}, []);
	return {
		notifications,
		isLoading,
		error,
	};
}
