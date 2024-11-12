import React, { useEffect, useState } from "react";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { EditProfileData } from "@/types/profile";
import updateProfiles from "@/services/api/profiles/updateProfiles";

interface ProfileUpdateStepProps {
	data: EditProfileData;
}

export function ProfileUpdateStep({ data }: ProfileUpdateStepProps) {
	const [isUpdating, setIsUpdating] = useState(true);
	const [updateSuccess, setUpdateSuccess] = useState<boolean | null>(null);

	useEffect(() => {
		const updateProfileData = async () => {
			const result = await updateProfiles({
				userId: data.UserId,
				userName: data.UserName,
				bio: data.Bio,
				profileImageUrl: data.ProfileImageUrl,
				bannerImageUrl: data.BannerImageUrl,
			});
			setIsUpdating(false);
			setUpdateSuccess(result !== null);
		};

		updateProfileData();
	}, [
		data.UserId,
		data.UserName,
		data.Bio,
		data.ProfileImageUrl,
		data.BannerImageUrl,
	]);

	if (isUpdating) {
		return (
			<div className="flex flex-col items-center justify-center space-y-4">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
				<p className="text-lg font-semibold">設定を変更中です</p>
			</div>
		);
	}

	if (updateSuccess === true) {
		return (
			<div className="flex flex-col items-center justify-center space-y-4">
				<CheckCircle className="h-8 w-8 text-green-500" />
				<p className="text-lg font-semibold">
					設定の変更が完了しました
				</p>
			</div>
		);
	}

	if (updateSuccess === false) {
		return (
			<div className="flex flex-col items-center justify-center space-y-4">
				<XCircle className="h-8 w-8 text-red-500" />
				<p className="text-lg font-semibold">
					設定の変更に失敗しました
				</p>
				<p className="text-sm text-gray-500">もう一度お試しください</p>
			</div>
		);
	}

	return null;
}
