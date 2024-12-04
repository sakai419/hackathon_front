import { ButtonWithTooltip } from "@/components/common";
import followAndNodify from "@/services/api/follow/followAndNodify";
import requestFollowAndNotify from "@/services/api/follow/requestFollowAndNotify";
import unfollow from "@/services/api/follow/unfollow";
import { useState } from "react";

interface FollowButtonProps {
	userId: string;
	isFollowing: boolean;
	isPending: boolean;
	isPrivate: boolean;
}

export default function FollowButton({
	userId,
	isFollowing,
	isPending,
	isPrivate,
}: FollowButtonProps) {
	const [isHovered, setIsHovered] = useState(false);

	const handleFollow = async () => {
		if (isFollowing) {
			await unfollow(userId);
		} else if (isPrivate) {
			await requestFollowAndNotify(userId);
		} else {
			await followAndNodify(userId);
		}
	};

	return (
		<ButtonWithTooltip
			description={
				isFollowing
					? isHovered
						? "フォロー解除"
						: "フォロー中"
					: isPending
					? "リクエスト送信済み"
					: isPrivate
					? "リクエストを送る"
					: "フォローする"
			}
			onClick={handleFollow}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			content={
				isFollowing
					? isHovered
						? "フォロー解除"
						: "フォロー中"
					: isPending
					? "リクエスト送信済み"
					: isPrivate
					? "リクエストを送る"
					: "フォローする"
			}
			variant={isFollowing ? "secondary" : "default"}
			buttonClassName={`
                rounded-full px-4
                ${
					isFollowing
						? "hover:bg-red-100 hover:text-red-600 hover:border-red-600"
						: ""
				}
            `}
		/>
	);
}
