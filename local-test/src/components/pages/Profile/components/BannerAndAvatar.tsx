import UserAvatar from "@/components/user/UserAvatar";
import Image from "next/image";
import EditProfileButton from "./EditProfileButton";
import SendMessageButton from "./SendMessageButton";
import FollowButton from "./FollowButton";
import { Profile } from "@/types/profile";
import { useClientProfileContext } from "@/context";

interface BannerAndAvatarProps {
	profile: Profile;
	updateProfile: (profile: Profile, updatedFiled: Partial<Profile>) => void;
}

export default function BannerAndAvatar({
	profile,
	updateProfile,
}: BannerAndAvatarProps) {
	const { profile: clientProfile } = useClientProfileContext();
	const isClient = clientProfile?.userInfo.userId === profile.userInfo.userId;
	return (
		<div className="relative">
			<div className="h-48 bg-muted">
				<Image
					src={
						!profile.bannerImageUrl
							? "/images/default_image.png"
							: profile.bannerImageUrl
					}
					alt="Banner"
					fill
					style={{ objectFit: "cover" }}
				/>
			</div>
			<div className="absolute -bottom-12 left-4">
				<UserAvatar
					withLink={false}
					userId={profile.userInfo.userName}
					src={profile.userInfo.profileImageUrl}
					alt={profile.userInfo.userName}
					size="w-24 h-24"
				/>
			</div>
			{isClient ? (
				<div className="absolute right-4 bottom-4">
					<EditProfileButton
						userId={profile.userInfo.userId}
						userName={profile.userInfo.userName}
						bio={profile.userInfo.bio}
						profileImageUrl={profile.userInfo.profileImageUrl}
						bannerImageUrl={profile.bannerImageUrl}
					/>
				</div>
			) : (
				<div className="absolute right-4 bottom-4 flex items-center justify-center space-x-1">
					<SendMessageButton userId={profile.userInfo.userId} />
					<FollowButton
						profile={profile}
						updateProfile={updateProfile}
					/>
				</div>
			)}
		</div>
	);
}
