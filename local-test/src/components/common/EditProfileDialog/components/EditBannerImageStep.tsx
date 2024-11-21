import { uploadFile } from "@/services/upload/upload";
import { EditProfileData } from "@/types/profile";
import { Label } from "@radix-ui/react-label";
import { Loader2, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface EditBannerImageStepProps {
	data: EditProfileData;
	updateData: (newData: Partial<EditProfileData>) => void;
}

export default function EditBannerImageStep({
	data,
	updateData,
}: EditBannerImageStepProps) {
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
					bannerImageUrl: url,
					isUploading: false,
				});
			} catch (error) {
				console.error(error);
				updateData({
					uploadError:
						"バナー画像のアップロードに失敗しました。もう一度お試しください。",
					isUploading: false,
				});
			}
		}
	};

	const bannerImage = data.bannerImageUrl || "/images/default_image.png";

	return (
		<div className="space-y-4">
			<Label htmlFor="bannerImage">バナー画像</Label>
			<div className="space-y-2">
				<div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
					<Image
						src={bannerImage}
						alt="バナー画像"
						layout="fill"
						objectFit="cover"
						className="object-cover w-full h-full"
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
				<p className="text-sm text-red-500">{data.uploadError}</p>
			)}
		</div>
	);
}
