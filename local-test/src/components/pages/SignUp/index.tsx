import Link from "next/link";
import SignUpCardContent from "./components/SignUpCardContent";
import FormCard from "@/components/elements/FormCard";
import { useState } from "react";
import SetUserInfoCardContent from "./components/SetUserInfoCardContent";

export default function SignupCard() {
	const [accountCreated, setAccountCreated] = useState(false);

	return (
		<>
			{accountCreated ? (
				<FormCard
					title="ユーザー情報の登録"
					description="ユーザー情報を登録してください"
					content={
						<SetUserInfoCardContent
							onSubmit={() => {
								setAccountCreated(false);
							}}
						/>
					}
					footer={
						<p className="text-sm text-muted-foreground">
							すでにアカウントをお持ちの場合は{" "}
							<Link
								href="/login"
								className="text-blue-600 hover:underline"
							>
								ログイン
							</Link>{" "}
							してください
						</p>
					}
				/>
			) : (
				<FormCard
					title="新規登録"
					description="アカウントを作成してください"
					content={
						<SignUpCardContent
							onSubmit={() => {
								setAccountCreated(true);
							}}
						/>
					}
					footer={
						<p className="text-sm text-muted-foreground">
							すでにアカウントをお持ちの場合は{" "}
							<Link
								href="/login"
								className="text-blue-600 hover:underline"
							>
								ログイン
							</Link>{" "}
							してください
						</p>
					}
				/>
			)}
		</>
	);
}
