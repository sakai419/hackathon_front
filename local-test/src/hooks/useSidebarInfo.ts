import { setDefaultImageOfSidebarInfo } from "@/lib/utils/setDefaultImage";
import transformKeysToCamelCase from "@/lib/utils/transformKeysToCamelCase";
import getSidebarInfo from "@/services/api/sidebar/getSidebarInfo";
import { SidebarInfo } from "@/types/sidebar";
import { useState, useEffect } from "react";

export function useSidebarInfo() {
	const [sidebarInfo, setSidebarInfo] = useState<SidebarInfo | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchSidebarInfo = async () => {
			try {
				setIsLoading(true);
				const data = await getSidebarInfo();
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<SidebarInfo>(data);
					setDefaultImageOfSidebarInfo(camelCaseData);
					setSidebarInfo(camelCaseData);
				}
			} catch (error) {
				setError("Failed to fetch sidebar info");
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchSidebarInfo();
	}, []);

	return { sidebarInfo, isLoading, error };
}
