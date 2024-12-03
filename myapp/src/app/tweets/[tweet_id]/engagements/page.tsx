"use client";

import { EngagementsPage } from "@/components/pages/Engagement";
import { useParams } from "next/navigation";

export default function Engagements() {
	const tweet_id = useParams()?.tweet_id;
	if (typeof tweet_id === "undefined") {
		return null;
	}
	return <EngagementsPage tweetId={Number(tweet_id)} />;
}
