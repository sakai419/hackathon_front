import DynamicTabs from "@/components/common/DynamicTab";
import useUserProfile from "@/hooks/useUserProfile";
import UserHeader from "./components/UserHeader";
import { useEffect, useState } from "react";
import useUserTweets from "@/hooks/useUserTweets";
import TweetList from "@/components/common/TweetList";
import { Button } from "@/components/ui/button";
import LoadingScreen from "@/components/common/LoadingScreen";
import { Lock } from "lucide-react";
import Header from "@/components/layouts/Header";

interface ProfileHeaderProps {
	userId: string;
}

interface ProfilePageProps {
	userId: string;
}

export function ProfileHeader({ userId }: ProfileHeaderProps) {
	const { profile, isLoading, error } = useUserProfile(userId);
	if (isLoading) {
		return <LoadingScreen />;
	}

	if (error) {
		return <div>エラーが発生しました</div>;
	}

	return (
		<Header
			title={
				<div className="flex flex-col">
					<div className="flex items-center gap-1">
						<span className="font-bold">{userId}</span>
						{profile?.userInfo.isPrivate && (
							<Lock className="w-4 h-4 text-primary" />
						)}
					</div>
					<span className="text-sm text-muted-foreground">
						{profile?.tweetCount}件のポスト
					</span>
				</div>
			}
		/>
	);
}

export function ProfilePage({ userId }: ProfilePageProps) {
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
	} = useUserProfile(userId);
	const {
		tweets,
		isLoading: isTweetsLoading,
		hasMore,
		loadMore,
		error: tweetsError,
	} = useUserTweets(userId);

	useEffect(() => {
		console.log();
	}, []);

	if (profileError || tweetsError) {
		return <div>エラーが発生しました</div>;
	}

	return (
		<>
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
		</>
	);
}
