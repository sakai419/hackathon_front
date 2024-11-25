import DynamicTabs from "@/components/common/DynamicTab";
import MainLayout from "@/components/layouts/MainLayout";
import useProfile from "@/hooks/useProfile";
import UserHeader from "./components/UserHeader";
import { useState } from "react";
import useUserTweets from "@/hooks/useUserTweets";
import TweetList from "@/components/common/TweetList";
import { Button } from "@/components/ui/button";
import LoadingScreen from "@/components/common/LoadingScreen";
import ProfileHeader from "./components/ProfileHeader";

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
	const {
		profile,
		isLoading: isProfileLoading,
		error: profileError,
	} = useProfile(userId);
	const {
		tweets,
		isLoading: isTweetsLoading,
		hasMore,
		loadMore,
		error: tweetsError,
	} = useUserTweets(userId);

	if (profileError || tweetsError) {
		return <div>エラーが発生しました</div>;
	}

	return (
		<MainLayout
			header={
				profile && (
					<ProfileHeader
						userId={profile.userInfo.userId}
						tweetCount={profile.tweetCount}
					></ProfileHeader>
				)
			}
		>
			{(isProfileLoading || isTweetsLoading) && <LoadingScreen />}
			<div className="max-w-2xl mx-auto">
				{profile && <UserHeader profile={profile} />}
				<DynamicTabs
					tabs={tabs}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
				{activeTab === "ツイート" && tweets && (
					<>
						<TweetList tweets={tweets} />
						<Button
							onClick={loadMore}
							className="w-full"
							disabled={!hasMore}
						>
							{hasMore
								? "もっと見る"
								: "これ以上ツイートはありません"}
						</Button>
					</>
				)}
				{activeTab === "返信" && <div>返信</div>}
				{activeTab === "リツイート" && <div>リツイート</div>}
				{activeTab === "いいね" && <div>いいね</div>}
			</div>
		</MainLayout>
	);
}
