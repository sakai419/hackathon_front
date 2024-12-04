import { Button } from "@/components/ui";
import { EditProfileData } from "@/types/profile";
import { useState } from "react";
import EditBannerImageStep from "./EditBannerImageStep";
import EditProfileImageStep from "./EditProfileImageStep";
import ProfileUpdateStep from "./ProfileUpdateStep";
import EditUserInfoStep from "./EditUserInfoStep";
import { MultiStepDialog } from "@/components/common";
import { validateUserId } from "@/lib/utils/validation";

interface EditProfileButtonProps {
	userId: string;
	userName: string;
	bio: string;
	profileImageUrl: string;
	bannerImageUrl: string;
}

export default function EditProfileButton({
	userId,
	userName,
	bio,
	profileImageUrl,
	bannerImageUrl,
}: EditProfileButtonProps) {
	const [isOpen, setIsOpen] = useState(false);

	const steps = [
		{
			title: "ユーザー情報",
			content: (
				data: EditProfileData,
				updateData: (newData: Partial<EditProfileData>) => void
			) => {
				return <EditUserInfoStep data={data} updateData={updateData} />;
			},
			validate: (data: EditProfileData) => {
				return (
					data.userId !== "" &&
					data.userName !== "" &&
					validateUserId(data.userId)
				);
			},
		},
		{
			title: "プロフィール画像",
			content: (
				data: EditProfileData,
				updateData: (newData: Partial<EditProfileData>) => void
			) => {
				return (
					<EditProfileImageStep data={data} updateData={updateData} />
				);
			},
			validate: (data: EditProfileData) => !data.isUploading,
		},
		{
			title: "バナー画像",
			content: (
				data: EditProfileData,
				updateData: (newData: Partial<EditProfileData>) => void
			) => {
				return (
					<EditBannerImageStep data={data} updateData={updateData} />
				);
			},
			validate: (data: EditProfileData) => !data.isUploading,
		},
		{
			title: "設定の変更",
			content: (data: EditProfileData) => {
				return <ProfileUpdateStep data={data} />;
			},
			validate: (data: EditProfileData) => !data.isUploading,
		},
	];

	const initialData: EditProfileData = {
		userId: userId,
		userName: userName,
		bio: bio,
		profileImageUrl: profileImageUrl,
		bannerImageUrl: bannerImageUrl,
		isUploading: false,
		uploadError: null,
	};

	return (
		<>
			<Button
				variant="outline"
				className="bg-background font-bold"
				onClick={() => setIsOpen(true)}
			>
				プロフィールを設定
			</Button>
			<MultiStepDialog<EditProfileData>
				isOpen={isOpen}
				initialData={initialData}
				onClose={() => setIsOpen(false)}
				steps={steps}
			/>
		</>
	);
}
