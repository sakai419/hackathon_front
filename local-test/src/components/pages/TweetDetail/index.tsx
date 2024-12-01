import LoadingScreen from "@/components/common/LoadingScreen";
import useReplyTweets from "@/hooks/useReplyTweets";
import useTweetNode from "@/hooks/useTweetNode";
import ReplyTweets from "./components/ReplyTweets";
import { Button } from "@/components/ui";
import { Code, Media } from "@/types/tweet";
import postReply from "@/services/api/tweets/postReply";
import ReplyBox from "./components/ReplyBox";
import { TweetList } from "@/components/tweet";
import { Header } from "@/components/layouts";

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
	} = useTweetNode({ tweetId });
	const {
		replyTweets,
		isLoading: isRepliesLoading,
		hasMore,
		loadMore,
		error: repliesError,
	} = useReplyTweets({ tweetId });

	if (tweetError || repliesError) {
		return <div>エラーが発生しました</div>;
	}

	const handleTweet = async (
		content?: string,
		code?: Code,
		media?: Media
	) => {
		if (!tweet) return;
		try {
			await postReply(tweet.tweet.tweetId, content, code, media);
		} catch (error) {
			throw error;
		}
	};

	return (
		<>
			{(isTweetLoading || isRepliesLoading) && <LoadingScreen />}
			<div className="max-w-2xl mx-auto border-x">
				<div className="border-b">
					{tweet && <TweetList tweets={[tweet]} />}
				</div>
				<ReplyBox onTweet={handleTweet} />
				{replyTweets && <ReplyTweets replies={replyTweets} />}
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
