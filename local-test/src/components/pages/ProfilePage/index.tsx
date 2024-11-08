import MainLayout from "@/components/layouts/MainLayout";
import UserHeader from "@/features/profile/components/UserHeader";
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
			</div>
		</MainLayout>
	);
}
