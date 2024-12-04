import UserAvatar from "@/components/user/UserAvatar";
import Image from "next/image";
import EditProfileButton from "./EditProfileButton";
import useClientProfile from "@/hooks/useClientProfile";
import SendMessageButton from "./SendMessageButton";
import FollowButton from "./FollowButton";
import { UserInfo } from "@/types/useInfo";

interface BannerAndAvatarProps {
	userInfo: UserInfo;
	profileImage: string;
	bannerImage: string;
}

export default function BannerAndAvatar({
	userInfo,
	profileImage,
	bannerImage,
}: BannerAndAvatarProps) {
	const { profile } = useClientProfile();
	const isClient = profile?.userInfo.userId === userInfo.userId;
	return (
		<div className="relative">
			<div className="h-48 bg-muted">
				<Image
					src={
						!bannerImage ? "/images/default_image.png" : bannerImage
					}
					alt="Banner"
					fill
					style={{ objectFit: "cover" }}
				/>
			</div>
			<div className="absolute -bottom-12 left-4">
				<UserAvatar
					withLink={false}
					userId={userInfo.userName}
					src={profileImage}
					alt={userInfo.userName}
					size="w-24 h-24"
				/>
			</div>
			{isClient ? (
				<div className="absolute right-4 bottom-4">
					<EditProfileButton
						userId={userInfo.userId}
						userName={userInfo.userName}
						bio={userInfo.bio}
						profileImageUrl={profileImage}
						bannerImageUrl={bannerImage}
					/>
				</div>
			) : (
				<div className="absolute right-4 bottom-4 flex items-center justify-center space-x-1">
					<SendMessageButton userId={userInfo.userId} />
					<FollowButton
						userId={userInfo.userId}
						isFollowing={userInfo.isFollowing}
						isPending={userInfo.isPending}
						isPrivate={userInfo.isPrivate}
					/>
				</div>
			)}
		</div>
	);
}
