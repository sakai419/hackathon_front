import getNotifications from "@/services/api/notifications/getNotifications";
import { useState, useEffect } from "react";
import { Notification } from "@/types/notification";
import transformKeysToCamelCase from "@/lib/utils/transformKeysToCamelCase";

export default function useNotifications() {
	const [notifications, setNotifications] = useState<Notification[] | null>(
		[]
	);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		const fetchNotifications = async () => {
			try {
				setLoading(true);
				const data = await getNotifications();
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<Notification[]>(data);
					setNotifications(camelCaseData);
				}
			} catch (err) {
				console.error(err);
				setError("Failed to fetch notifications");
			} finally {
				setLoading(false);
			}
		};
		fetchNotifications();
	}, []);
	return {
		notifications,
		loading,
		error,
	};
}
