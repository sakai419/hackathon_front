import { TweetInfo } from "@/types/tweetInfo";
import { useState, useRef, useEffect } from "react";
import TweetContent from "../../TweetContent";
import TweetActions from "../../TweetActions";

interface TweetItemProps {
	tweet: TweetInfo;
	updateTweet: (tweet: TweetInfo, updateFields: Partial<TweetInfo>) => void;
	showThreadLine?: boolean;
}

export default function TweetItem({
	tweet,
	updateTweet,
	showThreadLine = false,
}: TweetItemProps) {
	const [threadLineHeight, setThreadLineHeight] = useState(0);
	const componentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (showThreadLine && componentRef.current) {
			const height = componentRef.current.clientHeight;
			setThreadLineHeight(height);
		}
	}, [showThreadLine]);

	return (
		<div className="w-full">
			<div ref={componentRef}>
				<TweetContent
					tweet={tweet}
					showThreadLine={showThreadLine}
					threadLineHeight={threadLineHeight}
					tweetActions={
						<TweetActions tweet={tweet} updateTweet={updateTweet} />
					}
				/>
			</div>
		</div>
	);
}
