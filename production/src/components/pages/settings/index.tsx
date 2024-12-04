import { Header } from "@/components/layouts";
import { BlockedUsers } from "./components/BlockedUsers";
import { DeleteAccount } from "./components/DeleteAccount";
import { PrivacySettings } from "./components/PrivacySetting";

export function SettingsHeader() {
	return <Header title={<h1 className="text-xl font-bold">設定</h1>} />;
}

export function SettingsPage() {
	return (
		<div className="container mx-auto py-10">
			<div className="space-y-8">
				<PrivacySettings />
				<BlockedUsers />
				<DeleteAccount />
			</div>
		</div>
	);
}
