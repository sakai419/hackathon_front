import { uploadFile } from "@/services/upload/upload";
import { EditProfileData } from "@/types/profile";
import { Label } from "@/components/ui/label";
import { Loader2, Upload } from "lucide-react";
import UserAvatar from "@/components/common/UserAvatar";
import { Input } from "@/components/ui/input";

interface EditProfileImageStepProps {
	data: EditProfileData;
	updateData: (newData: Partial<EditProfileData>) => void;
}

export default function EditProfileImageStep({
	data,
	updateData,
}: EditProfileImageStepProps) {
	const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

	const profileImage = data.ProfileImageUrl || "/images/default_image.png";

	return (
		<div className="space-y-4">
			<Label htmlFor="profileImage">プロフィール画像</Label>
			<div className="flex items-center space-x-4">
				<UserAvatar
					withLink={false}
					userId={data.UserId}
					src={profileImage}
					alt={data.UserName}
					size="w-24 h-24"
				/>
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
				<p className="text-sm text-red-500">{data.uploadError}</p>
			)}
		</div>
	);
}
