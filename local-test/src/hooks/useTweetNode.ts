import { transformKeysToCamelCase } from "@/lib/utils/transformKeys";
import getTweetNode from "@/services/api/tweets/getTweetNode";
import { TweetNode } from "@/types/tweet";
import { useEffect, useRef, useState } from "react";

interface UseTweetNodeProps {
	tweetId: number;
}

export default function useTweetNode({ tweetId }: UseTweetNodeProps) {
	const [tweet, setTweet] = useState<TweetNode | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<unknown>(null);

	const isLoadingRef = useRef(isLoading);

	useEffect(() => {
		isLoadingRef.current = isLoading;
	}, [isLoading]);

	useEffect(() => {
		const fetchTweet = async () => {
			if (isLoadingRef.current) return;
			setIsLoading(true);
			try {
				const data = await getTweetNode(tweetId);
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<TweetNode>(data);
					setTweet(camelCaseData);
				}
			} catch (error) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchTweet();
	}, [tweetId]);

	return { tweet, isLoading, error };
}
