import { Input, Label, Textarea } from "@/components/ui";
import { validateUserId } from "@/lib/utils/validation";
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
			{data.userId && (
				<>
					{!validateUserId(data.userId) && (
						<p className="text-red-500 text-sm">
							ユーザーIDは半角英数字、「-」、「_」、「.」、で入力してください
						</p>
					)}
					{data.userId.length > 30 && (
						<p className="text-red-500 text-sm">
							ユーザーIDは30文字以下で入力してください
						</p>
					)}
					{data.userId === "me" && (
						<p className="text-red-500 text-sm">
							このユーザーIDは使用できません
						</p>
					)}
				</>
			)}
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
			{data.userName && data.userName.length > 30 && (
				<p className="text-red-500 text-sm">
					ユーザー名は30文字以下で入力してください
				</p>
			)}
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
