import { DynamicTabs } from "@/components/common";
import { useState } from "react";
import FollowingUsers from "./components/FollowingUsers";
import Followers from "./components/Followers";

interface FollowStatusPageProps {
	userId: string;
}

export function FollowStatusPage({ userId }: FollowStatusPageProps) {
	const [activeTab, setActiveTab] = useState("フォロー中");

	const tabNames = ["フォロー中", "フォロワー"];
	return (
		<>
			<DynamicTabs
				tabNames={tabNames}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
			{activeTab === "フォロー中" ? (
				<FollowingUsers userId={userId} />
			) : null}
			{activeTab === "フォロワー" ? <Followers userId={userId} /> : null}
		</>
	);
}
