import DynamicTabs from "@/components/common/DynamicTab";
import useUserProfile from "@/hooks/useUserProfile";
import { useState } from "react";
import useUserTweets from "@/hooks/useUserTweets";
import { Button } from "@/components/ui";
import LoadingScreen from "@/components/common/LoadingScreen";
import { Lock } from "lucide-react";
import Header from "@/components/layouts/Header";
import useUserLikes from "@/hooks/useUserLikes";
import useUserRetweets from "@/hooks/useUserRetweets";
import UserHeader from "./components/UserHeader";
import { TweetList } from "@/components/tweet";

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
	const tabNames = ["ツイート", "リツイート", "いいね"];

	const [activeTab, setActiveTab] = useState(tabNames[0]);
	const {
		profile,
		isLoading: isProfileLoading,
		error: profileError,
	} = useUserProfile(userId);
	const {
		tweets,
		isLoading: isTweetsLoading,
		hasMore: hasMoreTweets,
		loadMore: loadMoreTweets,
		error: tweetsError,
	} = useUserTweets(userId);
	const {
		retweets,
		isLoading: isRetweetsLoading,
		hasMore: hasMoreRetweets,
		loadMore: loadMoreRetweets,
		error: retweetsError,
	} = useUserRetweets(userId);
	const {
		likes,
		isLoading: isLikesLoading,
		hasMore: hasMoreLikes,
		loadMore: loadMoreLikes,
		error: likesError,
	} = useUserLikes(userId);

	if (profileError || tweetsError || likesError || retweetsError) {
		return <div>エラーが発生しました</div>;
	}

	return (
		<>
			{(isProfileLoading ||
				isTweetsLoading ||
				isLikesLoading ||
				isRetweetsLoading) && <LoadingScreen />}
			<div className="max-w-2xl mx-auto">
				{profile && <UserHeader profile={profile} />}
				<DynamicTabs
					tabNames={tabNames}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
				{activeTab === "ツイート" && tweets && (
					<>
						<TweetList tweets={tweets} />
						<Button
							onClick={loadMoreTweets}
							className="w-full"
							disabled={!hasMoreTweets}
						>
							{hasMoreTweets
								? "もっと見る"
								: "これ以上ツイートはありません"}
						</Button>
					</>
				)}
				{activeTab === "リツイート" && retweets && (
					<>
						<TweetList tweets={retweets} />
						<Button
							onClick={loadMoreRetweets}
							className="w-full"
							disabled={!hasMoreRetweets}
						>
							{hasMoreRetweets
								? "もっと見る"
								: "これ以上リツイートはありません"}
						</Button>
					</>
				)}
				{activeTab === "いいね" && likes && (
					<>
						<TweetList tweets={likes} />
						<Button
							onClick={loadMoreLikes}
							className="w-full"
							disabled={!hasMoreLikes}
						>
							{hasMoreLikes
								? "もっと見る"
								: "これ以上いいねはありません"}
						</Button>
					</>
				)}
			</div>
		</>
	);
}
