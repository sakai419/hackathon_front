import { DynamicTabs } from "@/components/common";
import Header from "@/components/layouts/Header";
import { useState } from "react";
import TimelineTweets from "./components/TimelineTweets";

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
		<div className="max-w-2xl mx-auto">
			<DynamicTabs
				tabNames={tabs}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
			{activeTab === "タイムライン" && <TimelineTweets />}
		</div>
	);
}
