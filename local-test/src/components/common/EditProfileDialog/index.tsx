import { MultiStepDialog } from "@/components/common/MultiStepDialog";
import { Button } from "@/components/ui/button";
import { EditProfileData } from "@/types/profile";
import { useState } from "react";
import EditBannerImageStep from "./components/EditBannerImageStep";
import EditProfileImageStep from "./components/EditProfileImageStep";
import ProfileUpdateStep from "./components/ProfileUpdateStep";
import EditUserInfoStep from "./components/EditUserInfoStep";

interface EditProfileDialogProps {
	userId: string;
	userName: string;
	bio: string;
	profileImageUrl: string;
	bannerImageUrl: string;
}

export default function EditProfileDialog({
	userId,
	userName,
	bio,
	profileImageUrl,
	bannerImageUrl,
}: EditProfileDialogProps) {
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
				return data.userId !== "" && data.userName !== "";
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
