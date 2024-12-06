import formatYearMonth from "@/lib/utils/formatYearMonth";
import BannerAndAvatar from "./BannerAndAvatar";
import ProfileInfo from "./ProfileInfo";
import { Profile } from "@/types/profile";

interface UserProfileProps {
	profile: Profile;
	updateProfile: (profile: Profile, updateFiled: Partial<Profile>) => void;
}

export default function UserHeader({
	profile,
	updateProfile,
}: UserProfileProps) {
	const Date = formatYearMonth(profile.createdAt);

	return (
		<div>
			<BannerAndAvatar profile={profile} updateProfile={updateProfile} />
			<ProfileInfo
				userId={profile.userInfo.userId}
				userName={profile.userInfo.userName}
				followingCount={profile.followingCount}
				followerCount={profile.followerCount}
				bio={profile.userInfo.bio}
				date={Date}
				isPrivate={profile.userInfo.isPrivate}
			/>
		</div>
	);
}
