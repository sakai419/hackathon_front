import { DynamicTabs } from "@/components/common";
import { Header } from "@/components/layouts";
import { useState } from "react";
import TimelineTweets from "./components/TimelineTweets";
import RecentTweets from "./components/RecentTweets";

export function HomeHeader() {
	return (
		<Header
			title={<h1 className="text-xl font-semibold">ホーム</h1>}
			withArrow={false}
		/>
	);
}

export function HomePage() {
	const tabs = ["タイムライン", "最新"];
	const [activeTab, setActiveTab] = useState(tabs[0]);

	return (
		<div className="max-w-2xl mx-auto min-w-0">
			<DynamicTabs
				tabNames={tabs}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
			{activeTab === "タイムライン" ? <TimelineTweets /> : null}
			{activeTab === "最新" ? <RecentTweets /> : null}
		</div>
	);
}
