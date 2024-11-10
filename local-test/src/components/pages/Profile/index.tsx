import DynamicTabs from "@/components/elements/DynamicTab";
import { TweetListExample } from "@/components/elements/TweetList";
import MainLayout from "@/components/layouts/MainLayout";
import useProfile from "@/hooks/useProfile";
import UserHeader from "./components/UserHeader";

interface ProfilePageProps {
	userId: string;
}

export default function ProfilePage({ userId }: ProfilePageProps) {
	const { profile, loading, error } = useProfile(userId);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<MainLayout>
			<div className="max-w-2xl mx-auto">
				{profile && <UserHeader profile={profile} />}
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
