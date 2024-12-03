import UserAvatar from "@/components/common/UserAvatar";
import Image from "next/image";
import EditProfileButton from "./EditProfileButton";
import useClientProfile from "@/hooks/useClientProfile";
import SendMessageButton from "./SendMessageButton";

interface BannerAndAvatarProps {
	userId: string;
	userName: string;
	bio: string;
	bannerImage: string;
	profileImage: string;
}

export default function BannerAndAvatar({
	userId,
	userName,
	bio,
	bannerImage,
	profileImage,
}: BannerAndAvatarProps) {
	const { profile } = useClientProfile();
	const isClient = profile?.userInfo.userId === userId;
	return (
		<div className="relative">
			<div className="h-48 bg-muted">
				<Image
					src={bannerImage}
					alt="Banner"
					fill
					style={{ objectFit: "cover" }}
				/>
			</div>
			<div className="absolute -bottom-12 left-4">
				<UserAvatar
					withLink={false}
					userId={userName}
					src={profileImage}
					alt={userName}
					size="w-24 h-24"
				/>
			</div>
			{isClient ? (
				<div className="absolute right-4 bottom-4">
					<EditProfileButton
						userId={userId}
						userName={userName}
						bio={bio}
						profileImageUrl={profileImage}
						bannerImageUrl={bannerImage}
					/>
				</div>
			) : (
				<div className="absolute right-4 bottom-4">
					<SendMessageButton userId={userId} />
				</div>
			)}
		</div>
	);
}
