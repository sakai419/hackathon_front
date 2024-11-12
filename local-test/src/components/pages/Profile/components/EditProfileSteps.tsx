import { MultiStepDialog } from "@/components/elements/MultiStepDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EditProfileData } from "@/types/profile";
import { useState } from "react";

export default function EditProfileSteps() {
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
	];

	const initialData: EditProfileData = {
		UserId: "",
		UserName: "",
		Bio: "",
		ProfileImageUrl: "",
		BannerImageUrl: "",
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
				onSubmit={handleSubmit}
				steps={steps}
			/>
		</>
	);
}
