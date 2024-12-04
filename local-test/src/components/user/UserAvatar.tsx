import { Avatar, AvatarImage } from "@/components/ui";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserAvatarProps {
	withLink?: boolean;
	userId: string;
	src?: string;
	alt: string;
	size?: string;
}

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
		router.push(`/users/${userId}`);
	};

	if (!src) {
		src = undefined;
	}

	return (
		<Avatar
			className={`${size} border-2 items-center justify-center z-30${
				!src ? " bg-gray-200" : ""
			}`}
			onClick={withLink ? handleCLick : undefined}
		>
			<AvatarImage src={src} alt={alt} />
			<AvatarFallback>
				<User className="w-5 h-5" />
			</AvatarFallback>
		</Avatar>
	);
}
