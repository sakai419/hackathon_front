import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
					value={data.UserId}
					onChange={(e) => updateData({ UserId: e.target.value })}
					placeholder="user_id"
					required
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="user_name">ユーザー名</Label>
				<Input
					id="user_name"
					value={data.UserName}
					onChange={(e) => updateData({ UserName: e.target.value })}
					placeholder="ユーザー名"
					required
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="bio">自己紹介</Label>
				<Textarea
					id="bio"
					value={data.Bio}
					onChange={(e) => updateData({ Bio: e.target.value })}
					placeholder="自己紹介"
					required
				/>
			</div>
		</div>
	);
}
