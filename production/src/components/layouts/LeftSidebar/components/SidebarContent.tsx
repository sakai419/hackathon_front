import {
	HomeIcon,
	BellIcon,
	MailIcon,
	UserIcon,
	SettingsIcon,
	Search,
	Shield,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import { useClientProfileContext } from "@/context";

interface SidebarContentProps {
	unreadConversationCount?: number;
	unreadNotificationCount?: number;
	userId?: string;
}

export default function SidebarContent({
	unreadConversationCount,
	unreadNotificationCount,
	userId,
}: SidebarContentProps) {
	const { profile } = useClientProfileContext();
	return (
		<nav className="space-y-2">
			<SidebarItem icon={HomeIcon} label="ホーム" href="/home" />
			<SidebarItem icon={Search} label="検索" href="/search" />
			<SidebarItem
				icon={BellIcon}
				label="通知"
				href="/notifications"
				count={unreadNotificationCount}
			/>
			<SidebarItem
				icon={MailIcon}
				label="メッセージ"
				href="/messages"
				count={unreadConversationCount}
			/>
			<SidebarItem
				icon={UserIcon}
				label="プロフィール"
				href={`/users/${userId}`}
			/>
			<SidebarItem icon={SettingsIcon} label="設定" href="/settings" />
			{profile?.userInfo.isAdmin && (
				<SidebarItem icon={Shield} label="管理者ページ" href="/admin" />
			)}
		</nav>
	);
}
