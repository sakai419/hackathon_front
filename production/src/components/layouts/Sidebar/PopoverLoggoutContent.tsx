import { useRouter } from "next/navigation";
import { handleLogout } from "@/services/auth/logout";

interface PopoverLogoutContentProps {
	userId: string;
}

export function PopoverLogoutContent({ userId }: PopoverLogoutContentProps) {
	const router = useRouter();

	const onLogoutClick = () => {
		handleLogout(router);
	};

	return (
		<div
			className="text-base font-bold cursor-pointer"
			onClick={onLogoutClick}
		>
			@{userId}からログアウト
		</div>
	);
}
