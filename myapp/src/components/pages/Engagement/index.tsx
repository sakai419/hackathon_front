import { Header } from "@/components/layouts";
import { useState } from "react";
import QuotingUsers from "./components/QuotingUsers";
import { DynamicTabs } from "@/components/common";
import RetweetingUsers from "./components/RetweetingUsers";
import LikingUsers from "./components/LikingUsers";

interface EngagementPageProps {
	tweetId: number;
}

export function EngagementsHeader() {
	return (
		<Header
			title={
				<h1 className="text-xl font-semibold">
					ツイートのエンゲージメント
				</h1>
			}
		/>
	);
}

export function EngagementsPage({ tweetId }: EngagementPageProps) {
	const tabNames = ["引用", "リツイート", "いいね"];
	const [activeTab, setActiveTab] = useState(tabNames[0]);

	return (
		<div>
			<DynamicTabs
				tabNames={tabNames}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
			{activeTab === "引用" ? <QuotingUsers tweetId={tweetId} /> : null}
			{activeTab === "リツイート" ? (
				<RetweetingUsers tweetId={tweetId} />
			) : null}
			{activeTab === "いいね" ? <LikingUsers tweetId={tweetId} /> : null}
		</div>
	);
}
