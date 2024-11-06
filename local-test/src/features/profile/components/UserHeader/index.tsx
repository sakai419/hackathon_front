import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserProfileProps {
	userId: string;
	userName: string;
	profileImageUrl?: string;
	bannerImageUrl?: string;
	bio?: string;
}

export default function UserHeader({
	userId,
	userName,
	profileImageUrl,
	bannerImageUrl,
	bio,
}: UserProfileProps) {
	const bannerImage =
		bannerImageUrl || "/placeholder.svg?height=200&width=800";
	const profileImage =
		profileImageUrl || "/placeholder.svg?height=40&width=40";

	return (
		<div className="relative mb-16">
			<div className="relative h-48">
				<img
					src={bannerImage}
					alt=""
					className="w-full h-full object-cover"
				/>
				<div className="absolute bottom-0 left-4 transform translate-y-1/2">
					<Avatar className="w-24 h-24 border-4 border-background">
						<AvatarImage
							src={profileImage}
							alt={`${userName}のプロフィール画像`}
						/>
						{/* <AvatarFallback>{userId?.charAt(0)}</AvatarFallback> */}
					</Avatar>
				</div>
			</div>
			<div className="mt-16 px-4">
				<div className="flex justify-between items-start">
					<div>
						<h1 className="text-2xl font-bold">{userId}</h1>
						<p className="text-muted-foreground">@{userName}</p>
					</div>
					<Button>フォローする</Button>
				</div>
				<p className="mt-4">{bio}</p>
			</div>
		</div>
	);
}
