import { transformKeysToCamelCase } from "@/lib/utils/transformKeys";
import getRecentLabels from "@/services/api/tweets/getRecentLabels";
import { LabelCount } from "@/types/label";
import { useState, useRef, useEffect } from "react";

export default function useRecentLabels() {
	const [labels, setLabels] = useState<LabelCount[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const isLoadingRef = useRef(isLoading);

	useEffect(() => {
		isLoadingRef.current = isLoading;
	}, [isLoading]);

	useEffect(() => {
		const fetchLabels = async () => {
			if (isLoadingRef.current) return;
			setIsLoading(true);
			try {
				const data = await getRecentLabels();
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<LabelCount[]>(data);
					setLabels(camelCaseData);
				}
			} catch (error) {
				console.error(error);
				setError("ラベルの取得に失敗しました");
			} finally {
				setIsLoading(false);
			}
		};
		fetchLabels();
	}, []);

	return { labels, isLoading, error };
}
