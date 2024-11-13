import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SetUserInfoCardContentProps {
	onSubmit: () => void;
}

export default function SetUserInfoCardContent({
	onSubmit,
}: SetUserInfoCardContentProps) {
	const [userId, setUserId] = useState("");
	const [userName, setUserName] = useState("");

	const router = useRouter();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit();
		router.push("/home");
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="user_id">ユーザーID</Label>
				<Input
					id="user_id"
					placeholder="ユーザーID"
					required
					value={userId}
					onChange={(e) => setUserId(e.target.value)}
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="user_name">ユーザー名</Label>
				<Input
					id="user_name"
					placeholder="ユーザー名"
					required
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
				/>
			</div>
			<Button type="submit" size="lg" className="w-full">
				次へ
			</Button>
		</form>
	);
}
