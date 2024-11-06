import { useRouter } from "next/navigation";
import { handleLogout } from "@/lib/logout"; // logout.ts 内で handleLogout を定義している場合

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
			onClick={onLogoutClick} // クリックでonLogoutClickを発火
		>
			@{userId}からログアウト
		</div>
	);
}
