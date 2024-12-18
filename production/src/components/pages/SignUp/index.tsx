import Link from "next/link";
import SignUpCardContent from "./components/SignUpCardContent";
import { useState } from "react";
import SetUserInfoCardContent from "./components/SetUserInfoCardContent";
import { AnimatedBackground, FormCard } from "@/components/common";

export default function SignupCard() {
	const [accountCreated, setAccountCreated] = useState(false);

	return (
		<>
			<AnimatedBackground />
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
					footer={<></>}
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
