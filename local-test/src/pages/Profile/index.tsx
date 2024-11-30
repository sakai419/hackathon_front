import DynamicTabs from "@/components/common/DynamicTab";
import useUserProfile from "@/hooks/useUserProfile";
import { useState } from "react";
import { LoadingScreen } from "@/components/common";
import { Lock } from "lucide-react";
import Header from "@/components/layouts/Header";
import UserHeader from "./components/UserHeader";
import UserTweets from "./components/UserTweets";
import UserRetweets from "./components/UserRetweets";
import UserLikes from "./components/UserLikes";

interface ProfileHeaderProps {
	userId: string;
}

interface ProfilePageProps {
	userId: string;
}

export function ProfileHeader({ userId }: ProfileHeaderProps) {
	const { profile, isLoading, error } = useUserProfile({ userId });
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
	const tabNames = ["ツイート", "リツイート", "いいね"];

	const [activeTab, setActiveTab] = useState(tabNames[0]);
	const {
		profile,
		isLoading: isProfileLoading,
		error: profileError,
	} = useUserProfile({ userId });

	if (profileError) {
		return <div>エラーが発生しました</div>;
	}

	return (
		<>
			{isProfileLoading && <LoadingScreen />}
			<div className="max-w-2xl mx-auto">
				{profile && <UserHeader profile={profile} />}
				<DynamicTabs
					tabNames={tabNames}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
				{activeTab === "ツイート" ? (
					<UserTweets userId={userId} />
				) : null}
				{activeTab === "リツイート" ? (
					<UserRetweets userId={userId} />
				) : null}
				{activeTab === "いいね" ? <UserLikes userId={userId} /> : null}
			</div>
		</>
	);
}
