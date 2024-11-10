import DynamicTabs from "@/components/elements/DynamicTab";
import { TweetListExample } from "@/components/elements/TweetList";
import MainLayout from "@/components/layouts/MainLayout";
import useProfile from "@/hooks/useProfile";
import { Profile } from "@/types/profile";
import { useEffect, useState } from "react";
import UserHeader from "./components/UserHeader";

interface ProfilePageProps {
	userId: string;
}

export default function ProfilePage({ userId }: ProfilePageProps) {
	const [profileData, setProfileData] = useState<Profile | null>(null);
	const { profile, loading, error } = useProfile(userId);

	useEffect(() => {
		if (!loading && !error) {
			setProfileData(profile);
		}
	}, [profile, loading, error]);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<MainLayout>
			<div className="max-w-2xl mx-auto">
				{profileData && <UserHeader profile={profileData} />}
				<DynamicTabs
					tabs={[
						{ Name: "ツイート", Url: `/profile/${userId}/tweets` },
						{ Name: "返信", Url: `/profile/${userId}/replies` },
						{
							Name: "リツイート",
							Url: `/profile/${userId}/retweets`,
						},
						{ Name: "いいね", Url: `/profile/${userId}/likes` },
					]}
				/>
				<TweetListExample />
			</div>
		</MainLayout>
	);
}
