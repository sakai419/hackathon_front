import transformKeysToCamelCase from "@/lib/utils/transformKeysToCamelCase";
import getUserTweets from "@/services/api/users/getUserTweets";
import { TweetNode } from "@/types/tweetInfo";
import { useEffect, useState } from "react";

export default function useUserTweets(userId: string) {
	const [tweets, setTweets] = useState<TweetNode[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUserTweets = async () => {
			try {
				setLoading(true);
				const data = await getUserTweets(userId);
				if (data) {
					const camelCaseData =
						transformKeysToCamelCase<TweetNode[]>(data);
					setTweets(camelCaseData);
				}
			} catch (err) {
				console.error(err);
				setError("ユーザーのツイートの取得に失敗しました");
			} finally {
				setLoading(false);
			}
		};
		fetchUserTweets();
	}, [userId]);

	return { tweets, loading, error };
}
