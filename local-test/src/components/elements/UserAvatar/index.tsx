import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

type UserAvatarProps = {
	withLink?: boolean;
	userId: string;
	src: string;
	alt: string;
	size?: string;
};

export default function UserAvatar({
	withLink = true,
	userId,
	src,
	alt,
	size = "w-10 h-10",
}: UserAvatarProps) {
	const avatar = (
		<Avatar className={`${size} border-2`}>
			<AvatarImage src={src} alt={alt} />
			<AvatarFallback>{alt[0]}</AvatarFallback>
		</Avatar>
	);

	if (withLink) {
		return <Link href={`/${userId}`}>{avatar}</Link>;
	}

	return avatar;
}
