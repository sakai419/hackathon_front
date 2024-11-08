"use client";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface TweetDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onTweet: (content: string) => void;
}

export default function TweetDialog({
	isOpen,
	onClose,
	onTweet,
}: TweetDialogProps) {
	const [tweetContent, setTweetContent] = useState("");

	const handleTweet = () => {
		onTweet(tweetContent);
		setTweetContent("");
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>新規ツイート</DialogTitle>
				</DialogHeader>
				<Textarea
					value={tweetContent}
					onChange={(e) => setTweetContent(e.target.value)}
					placeholder="いまどうしてる？"
					className="min-h-[100px]"
				/>
				<DialogFooter>
					<Button
						type="submit"
						onClick={handleTweet}
						disabled={!tweetContent.trim()}
					>
						ツイート
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
