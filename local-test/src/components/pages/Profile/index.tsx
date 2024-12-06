import DynamicTabs from "@/components/common/DynamicTabs";
import useUserProfile from "@/hooks/useUserProfile";
import { useEffect, useState } from "react";
import { ErrorMessage, LoadingScreen } from "@/components/common";
import { Lock } from "lucide-react";
import UserHeader from "./components/UserHeader";
import UserTweets from "./components/UserTweets";
import UserRetweets from "./components/UserRetweets";
import UserLikes from "./components/UserLikes";
import { Header } from "@/components/layouts";
import { Profile } from "@/types/profile";
import { useClientProfileContext } from "@/context";

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
		return <ErrorMessage error={error} />;
	}

	return (
		<Header
			title={
				<div className="flex flex-col">
					<div className="flex items-center gap-1">
						<span className="font-bold">{userId}</span>
						{profile?.userInfo.isPrivate && (
							<Lock className="w-4 h-4" />
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
	const { profile: clientProfile } = useClientProfileContext();
	const isClient = userId === clientProfile?.userInfo.userId;
	const tabNames = ["ツイート", "リツイート"];
	if (isClient) {
		tabNames.push("いいね");
	}

	const [activeTab, setActiveTab] = useState(tabNames[0]);
	const {
		profile,
		isLoading: isProfileLoading,
		error: profileError,
	} = useUserProfile({ userId });

	const [userProfile, setUserProfile] = useState<Profile | null>();

	const updateProfile = (profile: Profile, updateFiled: Partial<Profile>) => {
		setUserProfile({
			...profile,
			...updateFiled,
		});
	};

	useEffect(() => {
		if (profile) {
			setUserProfile(profile);
		}
	}, [profile]);

	if (profileError) {
		return <div>エラーが発生しました</div>;
	}

	return (
		<div className="max-w-2xl mx-auto min-w-0">
			{isProfileLoading && <LoadingScreen />}
			{userProfile && (
				<UserHeader
					profile={userProfile}
					updateProfile={updateProfile}
				/>
			)}
			<DynamicTabs
				tabNames={tabNames}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>
			{activeTab === "ツイート" ? <UserTweets userId={userId} /> : null}
			{activeTab === "リツイート" ? (
				<UserRetweets userId={userId} />
			) : null}
			{activeTab === "いいね" ? <UserLikes userId={userId} /> : null}
		</div>
	);
}
