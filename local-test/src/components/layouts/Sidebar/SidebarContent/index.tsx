import {
	HomeIcon,
	BellIcon,
	MailIcon,
	UserIcon,
	SettingsIcon,
	Search,
} from "lucide-react";
import SidebarItem from "../SidebarItem";

export default function SidebarContent() {
	return (
		<nav className="space-y-2">
			<SidebarItem icon={HomeIcon} label="ホーム" href="/home" />
			<SidebarItem icon={Search} label="検索" href="/search" />
			<SidebarItem icon={BellIcon} label="通知" href="/notifiactions" />
			<SidebarItem icon={MailIcon} label="メッセージ" href="messages" />
			<SidebarItem icon={UserIcon} label="プロフィール" href="profile" />
			<SidebarItem icon={SettingsIcon} label="設定" href="settings" />
		</nav>
	);
}
