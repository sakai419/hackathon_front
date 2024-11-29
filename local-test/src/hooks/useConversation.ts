import { setDefaultImageOfConversations } from "@/lib/utils/setDefaultImage";
import transformKeysToCamelCase from "@/lib/utils/transformKeysToCamelCase";
import getConversations from "@/services/api/conversations/getConversations";
import { Conversation } from "@/types/conversation";
import { useEffect, useRef, useState } from "react";

export default function useConversation() {
	const [conversations, setConversations] = useState<Conversation[]>([]);
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const isLoadingRef = useRef(isLoading);

	useEffect(() => {
		isLoadingRef.current = isLoading;
	}, [isLoading]);

	useEffect(() => {
		const fetchConversations = async () => {
			if (isLoadingRef.current || !hasMore) return;
			try {
				setIsLoading(true);
				const data = await getConversations(page);
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<Conversation[]>(data);
					setDefaultImageOfConversations(camelCaseData);
					setConversations((prev) => [...prev, ...camelCaseData]);
					if (camelCaseData.length < 10) {
						setHasMore(false);
					}
				} else {
					setHasMore(false);
				}
			} catch (error) {
				console.error(error);
				setError("Failed to fetch conversations");
			} finally {
				setIsLoading(false);
			}
		};
		fetchConversations();
	}, [page, hasMore]);

	const loadMore = () => {
		if (hasMore && !isLoading) {
			setPage((prev) => prev + 1);
		}
	};

	return {
		conversations,
		isLoading,
		hasMore,
		loadMore,
		error,
	};
}
