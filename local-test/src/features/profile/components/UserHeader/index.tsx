"use client";

import formatYearMonth from "@/lib/utils/formatYearMonth";
import ProfileHeader from "./ProfileHeader";
import BannerAndAvatar from "./BannerAndAvatar";
import ProfileInfo from "./ProfileInfo";
import { Profile } from "@/types/profile";

interface UserProfileProps {
	profile: Profile;
}

export default function UserHeader({ profile }: UserProfileProps) {
	const bannerImage = profile.BannerImageUrl || "/images/default_image.png";
	const profileImage =
		profile.UserInfo.ProfileImageUrl || "/images/default_image.png";
	const Date = formatYearMonth(profile.CreatedAt);

	return (
		<div className="relative">
			<ProfileHeader
				userId={profile.UserInfo.UserId}
				tweetCount={profile.TweetCount}
			/>
			<BannerAndAvatar
				bannerImage={bannerImage}
				profileImage={profileImage}
				userName={profile.UserInfo.UserName}
			/>
			<ProfileInfo
				userId={profile.UserInfo.UserId}
				userName={profile.UserInfo.UserName}
				followingCount={profile.FollowingCount}
				followerCount={profile.FollowerCount}
				bio={profile.UserInfo.Bio}
				date={Date}
			/>
		</div>
	);
}
