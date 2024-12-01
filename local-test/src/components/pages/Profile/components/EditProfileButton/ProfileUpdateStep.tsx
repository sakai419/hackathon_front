import React, { useCallback, useEffect, useState } from "react";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { EditProfileData } from "@/types/profile";
import updateProfiles from "@/services/api/profiles/updateProfiles";
import { Button } from "@/components/ui";
import isAPIError from "@/lib/utils/isAPIError";
import axios from "axios";

interface ProfileUpdateStepProps {
	data: EditProfileData;
}

export default function ProfileUpdateStep({ data }: ProfileUpdateStepProps) {
	const [isUpdating, setIsUpdating] = useState(true);
	const [updateSuccess, setUpdateSuccess] = useState<boolean | null>(null);
	const [error, setError] = useState<string | null>(null);

	const updateProfileData = useCallback(async () => {
		try {
			const result = await updateProfiles(data);
			setIsUpdating(false);
			setUpdateSuccess(result !== null);
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				if (isAPIError(error.response?.data)) {
					if (error.response.data.code === "DUPLICATE_ENTRY") {
						setError("このユーザーIDは既に使用されています");
					} else {
						setError(error.response.data.message);
					}
				} else {
					setError("エラーが発生しました");
				}
			} else {
				setError("エラーが発生しました");
			}
			setIsUpdating(false);
			setUpdateSuccess(false);
		}
	}, [data]);

	useEffect(() => {
		updateProfileData();
	}, [updateProfileData]);

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
				<p className="text-sm text-gray-500">
					ユーザーIDを変更した場合、プロフィールのURLが変更されます。一度ホーム画面に戻ってから再びプロフィール画面に戻るようにしてください。
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
				<p className="text-red-600">{error}</p>
				<p className="text-sm text-gray-500">もう一度お試しください</p>
				<Button
					type="button"
					onClick={() => {
						updateProfileData();
					}}
					disabled={isUpdating}
				>
					再試行
				</Button>
			</div>
		);
	}

	return null;
}
