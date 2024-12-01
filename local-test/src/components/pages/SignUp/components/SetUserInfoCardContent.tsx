import { Button, Input } from "@/components/ui";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import createAccount from "@/services/api/accounts/createAccount";
import axios, { AxiosError } from "axios";
import isAPIError from "@/lib/utils/isAPIError";

interface SetUserInfoCardContentProps {
	onSubmit: () => void;
}

export default function SetUserInfoCardContent({
	onSubmit,
}: SetUserInfoCardContentProps) {
	const [userId, setUserId] = useState("");
	const [userName, setUserName] = useState("");
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string>("");

	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await createAccount(userId, userName);
			onSubmit();
			router.push("/home");
		} catch (error: unknown) {
			console.log(error);
			if (axios.isAxiosError(error)) {
				const errorResponse = error as AxiosError;
				if (isAPIError(errorResponse.response?.data)) {
					if (
						errorResponse.response.data.code === "DUPLICATE_ENTRY"
					) {
						setIsError(true);
						setErrorMessage("このユーザーIDは既に使用されています");
					} else {
						setIsError(true);
						setErrorMessage(errorResponse.response.data.message);
					}
				}
			} else {
				setIsError(true);
				setErrorMessage("エラーが発生しました");
			}
		}
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
			{isError && <p className="text-red-500">{errorMessage}</p>}
			<Button type="submit" size="lg" className="w-full">
				完了
			</Button>
		</form>
	);
}
