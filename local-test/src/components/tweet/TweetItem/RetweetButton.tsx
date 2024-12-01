import React, { useState } from "react";
import { Repeat, MessageSquareQuote, Undo } from "lucide-react";
import {
	Button,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui";
import { Code, Media, TweetInfo } from "@/types/tweet";
import handleRetweet from "@/services/api/tweets/handleRetweet";
import postQuote from "@/services/api/tweets/postQuote";
import TweetDialog from "../TweetDialog";

interface RetweetButtonProps {
	tweet: TweetInfo;
	updateTweet: (tweet: TweetInfo, updateFields: Partial<TweetInfo>) => void;
}

export function RetweetButton({ tweet, updateTweet }: RetweetButtonProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);

	const onRetweet = async () => {
		try {
			await handleRetweet({
				tweetId: tweet.tweetId,
				hasRetweeted: tweet.hasRetweeted,
			});
			updateTweet(tweet, {
				hasRetweeted: !tweet.hasRetweeted,
				retweetsCount: tweet.hasRetweeted
					? tweet.retweetsCount - 1
					: tweet.retweetsCount + 1,
			});
		} catch (error) {
			throw error;
		}
	};

	const onQuote = async (content?: string, code?: Code, media?: Media) => {
		try {
			await postQuote({
				tweetId: tweet.tweetId,
				content,
				code,
				media,
			});
			setIsQuoteDialogOpen(false);
			updateTweet(tweet, { retweetsCount: tweet.retweetsCount + 1 });
		} catch (error) {
			throw error;
		}
	};

	const handleQuoteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsOpen(false);
		setIsQuoteDialogOpen(true);
	};

	const handleRetweetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsOpen(false);
		onRetweet();
	};

	const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsOpen(!isOpen);
		console.log("Button clicked", isOpen, e);
	};

	return (
		<>
			<Popover open={isOpen} onOpenChange={setIsOpen}>
				<PopoverTrigger asChild>
					{/* <ButtonWithTooltip
						description="リツイート"
						onClick={handleButtonClick}
						content={
							<>
								<Repeat className="w-4 h-4" />
								<span>{tweet.retweetsCount}</span>
							</>
						}
						buttonClassName={`flex items-center space-x-2 hover:bg-green-100 hover:text-green-500 ${
							tweet.hasRetweeted ? "text-green-500" : ""
						}`}
					/> */}
					<Button
						variant="ghost"
						className={`flex items-center space-x-2 hover:bg-green-100 hover:text-green-500 ${
							tweet.hasRetweeted ? "text-green-500" : ""
						}`}
						size={"sm"}
						onClick={handleButtonClick}
					>
						<Repeat className="w-4 h-4" />
						<span>{tweet.retweetsCount}</span>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<div className="flex flex-col">
						{tweet.hasRetweeted ? (
							<Button
								variant="ghost"
								className="flex items-center justify-start space-x-2 w-full"
								onClick={handleRetweetClick}
							>
								<Undo className="w-4 h-4" />
								<span>リツイートを取り消す</span>
							</Button>
						) : (
							<Button
								variant="ghost"
								className="flex items-center justify-start space-x-2 w-full"
								onClick={handleRetweetClick}
							>
								<Repeat className="w-4 h-4" />
								<span>リツイート</span>
							</Button>
						)}
						<Button
							variant="ghost"
							className="flex items-center justify-start space-x-2 w-full"
							onClick={handleQuoteClick}
						>
							<MessageSquareQuote className="w-4 h-4" />
							<span>引用</span>
						</Button>
					</div>
				</PopoverContent>
			</Popover>
			<TweetDialog
				tweetType="quote"
				relatedTweet={tweet}
				isOpen={isQuoteDialogOpen}
				onClose={() => setIsQuoteDialogOpen(false)}
				onTweet={onQuote}
			/>
		</>
	);
}
