import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/elements/UserAvatar";
import { Edit } from "lucide-react";
import EditProfileSteps from "./EditProfileDialog";

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
	return (
		<div className="relative">
			<div className="h-48 bg-muted">
				<img
					src={bannerImage}
					alt=""
					className="w-full h-full object-cover"
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
			<div className="absolute right-4 bottom-4">
				<EditProfileSteps
					userId={userId}
					userName={userName}
					bio={bio}
					profileImageUrl={profileImage}
					bannerImageUrl={bannerImage}
				/>
			</div>
		</div>
	);
}
