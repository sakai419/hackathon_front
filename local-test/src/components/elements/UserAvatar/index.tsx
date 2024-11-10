import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

type UserAvatarProps = {
	userId: string;
	src: string;
	alt: string;
	size?: string;
};

export default function UserAvatar({
	userId,
	src,
	alt,
	size = "w-10 h-10",
}: UserAvatarProps) {
	return (
		<Link href={`/${userId}`}>
			<Avatar className={size}>
				<AvatarImage src={src} alt={alt} />
				<AvatarFallback>{alt[0]}</AvatarFallback>
			</Avatar>
		</Link>
	);
}
