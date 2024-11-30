import { Input, Label, Textarea } from "@/components/ui";
import { EditProfileData } from "@/types/profile";

interface EditUserInfoStepProps {
	data: EditProfileData;
	updateData: (newData: Partial<EditProfileData>) => void;
}

export default function EditUserInfoStep({
	data,
	updateData,
}: EditUserInfoStepProps) {
	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="user_id">ユーザーID</Label>
				<Input
					id="user_id"
					value={data.userId}
					onChange={(e) => updateData({ userId: e.target.value })}
					placeholder="ユーザーID"
					required
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="user_name">ユーザー名</Label>
				<Input
					id="user_name"
					value={data.userName}
					onChange={(e) => updateData({ userName: e.target.value })}
					placeholder="ユーザー名"
					required
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="bio">自己紹介</Label>
				<Textarea
					id="bio"
					value={data.bio}
					onChange={(e) => updateData({ bio: e.target.value })}
					placeholder="自己紹介"
					required
				/>
			</div>
		</div>
	);
}
