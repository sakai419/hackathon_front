import LoadingScreen from "@/components/common/LoadingScreen";
import TweetList from "@/components/common/TweetList";
import Header from "@/components/layouts/Header";
import useReplyTweets from "@/hooks/useReplyTweets";
import useTweetNode from "@/hooks/useTweetNode";
import ReplyTweets from "./components/ReplyTweets";
import { Button } from "@/components/ui/button";

interface TweetDetailPageProps {
	tweetId: number;
}

export function TweetDetailHeader() {
	return (
		<Header
			title={<h1 className="text-xl font-semibold">ツイートする</h1>}
		/>
	);
}

export function TweetDetailPage({ tweetId }: TweetDetailPageProps) {
	const {
		tweet,
		isLoading: isTweetLoading,
		error: tweetError,
	} = useTweetNode(tweetId);
	const {
		replyTweets,
		isLoading: isRepliesLoading,
		hasMore,
		loadMore,
		error: repliesError,
	} = useReplyTweets(tweetId);

	if (tweetError || repliesError) {
		return <div>エラーが発生しました</div>;
	}

	return (
		<>
			{(isTweetLoading || isRepliesLoading) && <LoadingScreen />}
			<div className="max-w-2xl mx-auto min-h-screen border-x">
				<div className="border-b">
					{tweet && <TweetList tweets={[tweet]} />}
				</div>
				<div className="border-b p-4">
					<div className="flex items-start space-x-4">
						<div className="w-12 h-12 rounded-full bg-gray-200" />
						<div className="flex-1">
							<div className="min-h-[100px] rounded-2xl border p-4 text-gray-500">
								返信をポスト
							</div>
						</div>
					</div>
				</div>
				<ReplyTweets replies={replyTweets} />
				<Button
					onClick={loadMore}
					disabled={!hasMore}
					className="w-full"
				>
					{hasMore ? "もっと見る" : "これ以上は返信がありません"}
				</Button>
			</div>
		</>
	);
}
