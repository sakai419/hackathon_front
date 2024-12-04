import { Button } from "@/components/ui";
import followAndNodify from "@/services/api/follow/followAndNodify";
import requestFollowAndNotify from "@/services/api/follow/requestFollowAndNotify";
import unfollow from "@/services/api/follow/unfollow";
import { Profile } from "@/types/profile";
import { useState } from "react";

interface FollowButtonProps {
	profile: Profile;
	updateProfile: (profile: Profile, updateFiled: Partial<Profile>) => void;
}

export default function FollowButton({
	profile,
	updateProfile,
}: FollowButtonProps) {
	const [isHovered, setIsHovered] = useState(false);

	const handleFollow = async () => {
		if (profile.userInfo.isFollowing) {
			await unfollow(profile.userInfo.userId);
			updateProfile(profile, {
				userInfo: { ...profile.userInfo, isFollowing: false },
			});
		} else if (profile.userInfo.isPrivate) {
			await requestFollowAndNotify(profile.userInfo.userId);
			updateProfile(profile, {
				userInfo: { ...profile.userInfo, isPending: true },
			});
		} else {
			await followAndNodify(profile.userInfo.userId);
			updateProfile(profile, {
				userInfo: { ...profile.userInfo, isFollowing: true },
			});
		}
	};

	return (
		<Button
			onClick={handleFollow}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			variant={profile.userInfo.isFollowing ? "secondary" : "default"}
			className={`
                rounded-full px-4
                ${
					profile.userInfo.isFollowing
						? "hover:bg-red-100 hover:text-red-600 hover:border-red-600"
						: ""
				}
            `}
		>
			{profile.userInfo.isFollowing
				? isHovered
					? "フォロー解除"
					: "フォロー中"
				: profile.userInfo.isPending
				? "リクエスト送信済み"
				: profile.userInfo.isPrivate
				? "リクエストを送る"
				: "フォローする"}
		</Button>
	);
}
