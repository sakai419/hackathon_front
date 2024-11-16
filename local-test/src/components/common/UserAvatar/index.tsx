import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
	const router = useRouter();
	const handleCLick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		router.push(`/${userId}`);
	};

	const avatar = (
		<Avatar
			className={`${size} border-2`}
			onClick={withLink ? handleCLick : undefined}
		>
			<AvatarImage src={src} alt={alt} />
			<AvatarFallback>{alt[0]}</AvatarFallback>
		</Avatar>
	);

	return avatar;
}
