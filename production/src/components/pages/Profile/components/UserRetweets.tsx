import { ErrorMessage, LoadingScreen } from "@/components/common";
import { TweetList } from "@/components/tweet";
import { Button } from "@/components/ui";
import useUserRetweets from "@/hooks/useUserRetweets";
import isAPIError from "@/lib/utils/isAPIError";
import axios from "axios";
import { AccessErrorMessage } from "./AccessErrorMessage";

interface UserRetweetsProps {
	userId: string;
}

export default function UserRetweets({ userId }: UserRetweetsProps) {
	const { retweets, isLoading, hasMore, loadMore, error } = useUserRetweets({
		userId,
	});

	if (error) {
		if (axios.isAxiosError(error)) {
			if (isAPIError(error.response?.data)) {
				switch (error.response.data.code) {
					case "BLOCKED":
						return (
							<AccessErrorMessage
								userId={userId}
								status="blocked"
							/>
						);
					case "BLOCKING":
						return (
							<AccessErrorMessage
								userId={userId}
								status="blocking"
							/>
						);
					case "PRIVATE_ACCOUNT":
						return (
							<AccessErrorMessage
								userId={userId}
								status="private"
							/>
						);
					default:
						return <ErrorMessage error={error} />;
				}
			} else {
				return <ErrorMessage error={error} />;
			}
		} else {
			return <ErrorMessage error={error} />;
		}
	}

	return (
		<>
			{isLoading && <LoadingScreen />}
			<div className="max-w-2xl mx-auto">
				<TweetList tweets={retweets} />
				<Button
					onClick={loadMore}
					disabled={!hasMore}
					className="w-full"
				>
					{hasMore ? "さらに読み込む" : "読み込み完了"}
				</Button>
			</div>
		</>
	);
}
