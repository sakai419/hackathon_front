import { transformKeysToCamelCase } from "@/lib/utils/transformKeys";
import getLeftSidebarInfo from "@/services/api/sidebar/getLeftSidebarInfo";
import { LeftSidebarInfo } from "@/types/sidebar";
import { useState, useEffect } from "react";

export default function useLeftSidebarInfo() {
	const [sidebarInfo, setSidebarInfo] = useState<LeftSidebarInfo | null>(
		null
	);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<unknown>(null);

	useEffect(() => {
		const fetchSidebarInfo = async () => {
			try {
				setIsLoading(true);
				const data = await getLeftSidebarInfo();
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<LeftSidebarInfo>(data);
					setSidebarInfo(camelCaseData);
				}
			} catch (error) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchSidebarInfo();
	}, []);

	return { sidebarInfo, isLoading, error };
}
