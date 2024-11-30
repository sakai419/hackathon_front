import transformKeysToCamelCase from "@/lib/utils/transformKeysToCamelCase";
import getMessages from "@/services/api/conversations/getMessages";
import { Message } from "@/types/message";
import { useEffect, useRef, useState } from "react";

interface UseMessagesProps {
	userId: string;
}

export default function useMessages({ userId }: UseMessagesProps) {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState(1);

	const isLoadingRef = useRef(isLoading);

	useEffect(() => {
		isLoadingRef.current = isLoading;
	}, [isLoading]);

	useEffect(() => {
		const fetchMessages = async () => {
			if (isLoadingRef.current || !hasMore || !userId) return;
			try {
				setIsLoading(true);
				const data = await getMessages(userId, page);
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<Message[]>(data);
					setMessages((prev) => [...prev, ...camelCaseData]);
					if (camelCaseData.length < 10) {
						setHasMore(false);
					}
				} else {
					setHasMore(false);
				}
			} catch (error) {
				console.error(error);
				setError("Failed to fetch messages");
			} finally {
				setIsLoading(false);
			}
		};
		fetchMessages();
	}, [userId, page, hasMore]);

	const loadMore = () => {
		if (hasMore && !isLoading) {
			setPage((prev) => prev + 1);
		}
	};

	return {
		messages,
		isLoading,
		hasMore,
		loadMore,
		error,
	};
}
