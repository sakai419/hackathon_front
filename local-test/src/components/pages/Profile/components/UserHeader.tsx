import formatYearMonth from "@/lib/utils/formatYearMonth";
import ProfileHeader from "./ProfileHeader";
import BannerAndAvatar from "./BannerAndAvatar";
import ProfileInfo from "./ProfileInfo";
import { Profile } from "@/types/profile";

interface UserProfileProps {
	profile: Profile;
}

export default function UserHeader({ profile }: UserProfileProps) {
	const bannerImage = profile.bannerImageUrl || "/images/default_image.png";
	const profileImage =
		profile.userInfo.profileImageUrl || "/images/default_image.png";
	const Date = formatYearMonth(profile.createdAt);

	return (
		<div className="relative">
			<ProfileHeader
				userId={profile.userInfo.userId}
				tweetCount={profile.tweetCount}
			/>
			<BannerAndAvatar
				userId={profile.userInfo.userId}
				userName={profile.userInfo.userName}
				bio={profile.userInfo.bio}
				bannerImage={bannerImage}
				profileImage={profileImage}
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
