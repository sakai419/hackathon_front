import { TweetInfo } from "@/types/tweetInfo";
import { useState, useRef, useEffect } from "react";
import TweetContent from "../../TweetContent";
import { useRouter } from "next/navigation";

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
	const [threadLineHeight, setThreadLineHeight] = useState(0);
	const componentRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	useEffect(() => {
		if (showThreadLine && componentRef.current) {
			const height = componentRef.current.clientHeight;
			setThreadLineHeight(height);
		}
	}, [showThreadLine]);

	const onTweetClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		router.push(`/tweet/${tweet.tweetId}`);
	};

	return (
		<div ref={componentRef} onClick={onTweetClick}>
			<TweetContent
				tweet={tweet}
				showThreadLine={showThreadLine}
				threadLineHeight={threadLineHeight}
				quotedTweet={quotedTweet}
				withActions={true}
				updateTweet={updateTweet}
			/>
		</div>
	);
}
