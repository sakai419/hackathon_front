"use client";

import { TweetDetailPage } from "@/pages/TweetDetail";
import { useParams } from "next/navigation";

export default function TweetDetail() {
	const tweet_id = useParams().tweet_id;
	if (typeof tweet_id === "undefined") {
		return null;
	}
	return <TweetDetailPage tweetId={Number(tweet_id)} />;
}
