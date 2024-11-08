import {
	HomeIcon,
	BellIcon,
	MailIcon,
	UserIcon,
	SettingsIcon,
	Search,
} from "lucide-react";
import SidebarItem from "../SidebarItem";

interface SidebarContentProps {
	UnreadConversationCount?: number;
	UnreadNotificationCount?: number;
	UserId?: string;
}

export default function SidebarContent({
	UnreadConversationCount,
	UnreadNotificationCount,
	UserId,
}: SidebarContentProps) {
	return (
		<nav className="space-y-2">
			<SidebarItem icon={HomeIcon} label="ホーム" href="/home" />
			<SidebarItem icon={Search} label="検索" href="/search" />
			<SidebarItem
				icon={BellIcon}
				label="通知"
				href="/notifiactions"
				count={UnreadNotificationCount}
			/>
			<SidebarItem
				icon={MailIcon}
				label="メッセージ"
				href="messages"
				count={UnreadConversationCount}
			/>
			<SidebarItem
				icon={UserIcon}
				label="プロフィール"
				href={`profile/${UserId}`}
			/>
			<SidebarItem icon={SettingsIcon} label="設定" href="settings" />
		</nav>
	);
}
