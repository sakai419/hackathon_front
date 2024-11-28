import { TweetInfo } from "@/types/tweet";
import TweetContent from "../../TweetContent";

interface TweetItemProps {
	tweet: TweetInfo;
	updateTweet: (tweet: TweetInfo, updateFields: Partial<TweetInfo>) => void;
	showThreadLine?: boolean;
	quotedTweet?: TweetInfo;
}

export default function TweetItem({
	tweet,
	updateTweet,
	showThreadLine = false,
	quotedTweet,
}: TweetItemProps) {
	return (
		<TweetContent
			tweet={tweet}
			showThreadLine={showThreadLine}
			quotedTweet={quotedTweet}
			withActions={true}
			updateTweet={updateTweet}
		/>
	);
}
