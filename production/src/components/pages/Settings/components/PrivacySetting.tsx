import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import useClientProfile from "@/hooks/useClientProfile";
import { LoadingScreen } from "@/components/common";
import updateSettings from "@/services/api/settings/updateSettings";

export function PrivacySettings() {
	const { profile, isLoading } = useClientProfile();
	const [isPrivate, setIsPrivate] = useState(false);

	useEffect(() => {
		if (profile) {
			setIsPrivate(profile.userInfo.isPrivate);
		}
	}, [profile]);

	const handlePrivacyChange = async (checked: boolean) => {
		try {
			await updateSettings({ isPrivate: checked });
			setIsPrivate(checked);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			{isLoading && <LoadingScreen />}
			<Card>
				<CardHeader>
					<CardTitle>アカウントの非公開</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-between">
						<Label
							htmlFor="private-account"
							className="text-sm text-muted-foreground"
						>
							アカウントを非公開にする
						</Label>
						<Switch
							id="private-account"
							checked={isPrivate}
							onCheckedChange={handlePrivacyChange}
						/>
					</div>
				</CardContent>
			</Card>
		</>
	);
}
