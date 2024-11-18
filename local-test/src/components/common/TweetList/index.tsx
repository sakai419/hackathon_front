import { TweetNode } from "@/types/tweetInfo";
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
						<div className="flex items-start pt-4 pl-4 w-full">
							<div className="relative w-10 h-4">
								<div className="absolute top-2 left-1/2 w-0.5 h-0.5 bg-gray-400 -translate-x-1/2"></div>
								<div className="absolute top-3 left-1/2 w-0.5 h-0.5 bg-gray-400 -translate-x-1/2"></div>
								<div className="absolute top-4 left-1/2 w-0.5 h-0.5 bg-gray-400 -translate-x-1/2"></div>
								<div className="absolute top-5 left-1/2 w-0.5 h-0.5 bg-gray-400 -translate-x-1/2"></div>
								<div className="absolute top-6 left-1/2 w-0.5 h-0.5 bg-gray-400 -translate-x-1/2"></div>
							</div>
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
