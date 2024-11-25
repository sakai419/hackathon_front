import formatYearMonth from "@/lib/utils/formatYearMonth";
import BannerAndAvatar from "./BannerAndAvatar";
import ProfileInfo from "./ProfileInfo";
import { Profile } from "@/types/profile";

interface UserProfileProps {
	profile: Profile;
}

export default function UserHeader({ profile }: UserProfileProps) {
	const Date = formatYearMonth(profile.createdAt);

	return (
		<div className="relative">
			<BannerAndAvatar
				userId={profile.userInfo.userId}
				userName={profile.userInfo.userName}
				bio={profile.userInfo.bio}
				bannerImage={profile.bannerImageUrl}
				profileImage={profile.userInfo.profileImageUrl}
			/>
			<ProfileInfo
				userId={profile.userInfo.userId}
				userName={profile.userInfo.userName}
				followingCount={profile.followingCount}
				followerCount={profile.followerCount}
				bio={profile.userInfo.bio}
				date={Date}
			/>
		</div>
	);
}
