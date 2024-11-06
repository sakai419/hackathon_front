import {
	HomeIcon,
	BellIcon,
	MailIcon,
	UserIcon,
	SettingsIcon,
} from "lucide-react";
import SidebarItem from "./SidebarItem";

export default function SidebarContent() {
	return (
		<nav className="space-y-2">
			<SidebarItem icon={HomeIcon} label="ホーム" />
			<SidebarItem icon={BellIcon} label="通知" />
			<SidebarItem icon={MailIcon} label="メッセージ" />
			<SidebarItem icon={UserIcon} label="プロフィール" />
			<SidebarItem icon={SettingsIcon} label="設定" />
		</nav>
	);
}
