import { transformKeysToCamelCase } from "@/lib/utils/transformKeys";
import getRightSidebarInfo from "@/services/api/sidebar/getRightSidebarInfo";
import { RightSidebarInfo } from "@/types/sidebar";
import { useState, useEffect } from "react";

export default function useRightSidebarInfo() {
	const [sidebarInfo, setSidebarInfo] = useState<RightSidebarInfo | null>(
		null
	);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<unknown>(null);

	useEffect(() => {
		const fetchSidebarInfo = async () => {
			try {
				setIsLoading(true);
				const data = await getRightSidebarInfo();
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<RightSidebarInfo>(data);
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
