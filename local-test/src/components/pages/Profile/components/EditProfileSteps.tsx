import { MultiStepDialog } from "@/components/elements/MultiStepDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { uploadFile } from "@/services/upload/upload";
import { EditProfileData, Profile } from "@/types/profile";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, Upload } from "lucide-react";
import { useState } from "react";
import { ProfileUpdateStep } from "./ProfileUpdateStep";

interface EditProfileStepsProps {
	userId: string;
	userName: string;
	bio: string;
	profileImageUrl: string;
	bannerImageUrl: string;
}

export default function EditProfileSteps({
	userId,
	userName,
	bio,
	profileImageUrl,
	bannerImageUrl,
}: EditProfileStepsProps) {
	const [isOpen, setIsOpen] = useState(false);

	const steps = [
		{
			title: "ユーザー情報",
			content: (
				data: EditProfileData,
				updateData: (newData: Partial<EditProfileData>) => void
			) => (
				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="user_id">ユーザーID</Label>
						<Input
							id="user_id"
							value={data.UserId}
							onChange={(e) =>
								updateData({ UserId: e.target.value })
							}
							placeholder="user_id"
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="user_name">ユーザー名</Label>
						<Input
							id="user_name"
							value={data.UserName}
							onChange={(e) =>
								updateData({ UserName: e.target.value })
							}
							placeholder="ユーザー名"
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="bio">自己紹介</Label>
						<Textarea
							id="bio"
							value={data.Bio}
							onChange={(e) =>
								updateData({ Bio: e.target.value })
							}
							placeholder="自己紹介"
							required
						/>
					</div>
				</div>
			),
			validate: (data: EditProfileData) => {
				return (
					data.UserId !== "" &&
					data.UserName !== "" &&
					data.Bio !== ""
				);
			},
		},
		{
			title: "プロフィール画像",
			content: (
				data: EditProfileData,
				updateData: (newData: Partial<EditProfileData>) => void
			) => {
				const handleFileUpload = async (
					e: React.ChangeEvent<HTMLInputElement>
				) => {
					const file = e.target.files?.[0];
					if (file) {
						console.log("called");
						updateData({ isUploading: true, uploadError: null });
						try {
							const url = await uploadFile(file);
							updateData({
								ProfileImageUrl: url,
								isUploading: false,
							});
						} catch (err) {
							updateData({
								uploadError:
									"画像のアップロードに失敗しました。もう一度お試しください。",
								isUploading: false,
							});
						}
					}
				};

				const profileImage =
					data.ProfileImageUrl || "/images/default_image.png";

				return (
					<div className="space-y-4">
						<Label htmlFor="profileImage">プロフィール画像</Label>
						<div className="flex items-center space-x-4">
							<Avatar className="w-20 h-20">
								<AvatarImage
									src={profileImage}
									alt="プロフィール画像"
								/>
								<AvatarFallback>
									{data.UserName ? data.UserName[0] : "U"}
								</AvatarFallback>
							</Avatar>
							<div>
								<Input
									id="profileImage"
									type="file"
									accept="image/*"
									onChange={handleFileUpload}
									disabled={data.isUploading}
									className="hidden"
								/>
								<Label
									htmlFor="profileImage"
									className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
								>
									{data.isUploading ? (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									) : (
										<Upload className="mr-2 h-4 w-4" />
									)}
									画像をアップロード
								</Label>
							</div>
						</div>
						{data.uploadError && (
							<p className="text-sm text-red-500">
								{data.uploadError}
							</p>
						)}
					</div>
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
				const handleBannerUpload = async (
					e: React.ChangeEvent<HTMLInputElement>
				) => {
					const file = e.target.files?.[0];
					if (file) {
						updateData({
							isUploading: true,
							uploadError: null,
						});
						try {
							const url = await uploadFile(file);
							updateData({
								BannerImageUrl: url,
								isUploading: false,
							});
						} catch (err) {
							updateData({
								uploadError:
									"バナー画像のアップロードに失敗しました。もう一度お試しください。",
								isUploading: false,
							});
						}
					}
				};

				const bannerImage =
					data.BannerImageUrl || "/images/default_image.png";

				return (
					<div className="space-y-4">
						<Label htmlFor="bannerImage">バナー画像</Label>
						<div className="space-y-2">
							<div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
								<img
									src={bannerImage}
									alt="バナー画像"
									className="w-full h-full object-cover"
								/>
							</div>
							<Input
								id="bannerImage"
								type="file"
								accept="image/*"
								onChange={handleBannerUpload}
								disabled={data.isUploading}
								className="hidden"
							/>
							<Label
								htmlFor="bannerImage"
								className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
							>
								{data.isUploading ? (
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								) : (
									<Upload className="mr-2 h-4 w-4" />
								)}
								バナー画像をアップロード
							</Label>
						</div>
						{data.uploadError && (
							<p className="text-sm text-red-500">
								{data.uploadError}
							</p>
						)}
					</div>
				);
			},
			validate: (data: EditProfileData) => !data.isUploading,
		},
		{
			title: "設定の変更",
			content: (data: EditProfileData) => {
				return (
					<ProfileUpdateStep
						userId={data.UserId}
						userName={data.UserName}
						bio={data.Bio}
						profileImageUrl={data.ProfileImageUrl}
						bannerImageUrl={data.BannerImageUrl}
					/>
				);
			},
			validate: (data: EditProfileData) => !data.isUploading,
		},
	];

	const initialData: EditProfileData = {
		UserId: userId,
		UserName: userName,
		Bio: bio,
		ProfileImageUrl: profileImageUrl,
		BannerImageUrl: bannerImageUrl,
		isUploading: false,
		uploadError: null,
	};

	const handleSubmit = async (data: EditProfileData) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		console.log(data);
		return { success: true };
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
			<MultiStepDialog
				isOpen={isOpen}
				initialData={initialData}
				onClose={() => setIsOpen(false)}
				// onSubmit={handleSubmit}
				steps={steps}
			/>
		</>
	);
}
