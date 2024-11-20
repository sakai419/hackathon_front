import transformKeysToCamelCase from "@/lib/utils/transformKeysToCamelCase";
import getSidebarInfo from "@/services/api/sidebar/getSidebarInfo";
import { SidebarInfo } from "@/types/sidebar";
import { useState, useEffect } from "react";

export function useSidebarInfo() {
	const [sidebarInfo, setSidebarInfo] = useState<SidebarInfo | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchSidebarInfo = async () => {
			try {
				setLoading(true);
				const data = await getSidebarInfo();
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<SidebarInfo>(data);
					setSidebarInfo(camelCaseData);
				}
			} catch (err) {
				setError("Failed to fetch sidebar info");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchSidebarInfo();
	}, []);

	return { sidebarInfo, loading, error };
}
