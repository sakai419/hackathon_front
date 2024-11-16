import DynamicTabs from "@/components/common/DynamicTab";
import MainLayout from "@/components/layouts/MainLayout";
import useProfile from "@/hooks/useProfile";
import UserHeader from "./components/UserHeader";
import { useState } from "react";
import useUserTweets from "@/hooks/useUserTweets";
import TweetList from "@/components/common/TweetList";

interface ProfilePageProps {
	userId: string;
}

export default function ProfilePage({ userId }: ProfilePageProps) {
	const tabs = [
		{ Name: "ツイート", Url: `/profile/${userId}/tweets` },
		{ Name: "返信", Url: `/profile/${userId}/replies` },
		{ Name: "リツイート", Url: `/profile/${userId}/retweets` },
		{ Name: "いいね", Url: `/profile/${userId}/likes` },
	];

	const [activeTab, setActiveTab] = useState(tabs[0].Name);
	const { profile, loading, error } = useProfile(userId);
	const {
		tweets,
		loading: tweetsLoading,
		error: tweetsError,
	} = useUserTweets(userId);

	if (loading || tweetsLoading) {
		return <div>Loading...</div>;
	}

	if (error || tweetsError) {
		return <div>{error}</div>;
	}

	return (
		<MainLayout>
			<div className="max-w-2xl mx-auto">
				{profile && <UserHeader profile={profile} />}
				<DynamicTabs
					tabs={tabs}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
				{activeTab === "ツイート" && tweets && (
					<TweetList tweets={tweets} />
				)}
			</div>
		</MainLayout>
	);
}
