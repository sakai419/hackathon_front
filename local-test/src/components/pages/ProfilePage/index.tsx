import TweetList from "@/components/elements/TweetList";
import UserHeader from "@/features/profile/components/UserHeader";
import UserStats from "@/features/profile/components/UserStats";
import useProfile from "@/hooks/useProfile";
import { Profile } from "@/types/profile";
import { useEffect, useState } from "react";

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
		console.log(profile, profileData);
	}, [profile, loading, error]);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<div className="max-w-2xl mx-auto">
			{profileData && <UserHeader {...profileData} />}
			<div className="px-4">
				{profileData && <UserStats {...profileData} />}
			</div>
			<TweetList tweets={[]} />
		</div>
	);
}
