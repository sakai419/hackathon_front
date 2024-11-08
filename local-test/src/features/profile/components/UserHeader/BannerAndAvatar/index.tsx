import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface BannerAndAvatarProps {
	bannerImage: string;
	profileImage: string;
	userName: string;
}

export default function BannerAndAvatar({
	bannerImage,
	profileImage,
	userName,
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
				<Avatar className="w-24 h-24 border-4 border-background">
					<AvatarImage
						src={profileImage}
						alt={`${userName}のプロフィール画像`}
					/>
					<AvatarFallback>{userName?.charAt(0)}</AvatarFallback>
				</Avatar>
			</div>
			<div className="absolute right-4 bottom-4">
				<Button variant="outline" className="bg-background font-bold">
					プロフィールを設定
				</Button>
			</div>
		</div>
	);
}
