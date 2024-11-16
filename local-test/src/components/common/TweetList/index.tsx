import { MediaTypes, TweetNode } from "@/types/tweetInfo";
import TweetItem from "../TweetItem";

export default function TweetList({ tweets }: { tweets: TweetNode[] }) {
	return (
		<div className="divide-y divide-gray-200">
			{tweets.map((tweet, index) => (
				<div key={index} className="flex-col p-4">
					{tweet.OriginalTweet && (
						<TweetItem
							tweet={tweet.OriginalTweet}
							showThreadLine={true}
						/>
					)}
					{tweet.OmittedReplyExist && (
						<div className="flex items-center justify-center w-8 h-8">
							<div className="w-2 h-2 bg-gray-400 rounded-full"></div>
							<div className="w-2 h-2 bg-gray-400 rounded-full"></div>
							<div className="w-2 h-2 bg-gray-400 rounded-full"></div>
						</div>
					)}
					{tweet.ParentReply && (
						<TweetItem
							tweet={tweet.ParentReply}
							showThreadLine={true}
						/>
					)}
					<TweetItem tweet={tweet.Tweet} />
				</div>
			))}
		</div>
	);
}
