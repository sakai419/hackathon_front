import { ButtonWithTooltip } from "@/components/common";
import { Button, Input } from "@/components/ui";
import handleSignup from "@/services/auth/signup";
import { Label } from "@radix-ui/react-label";
import { FirebaseError } from "firebase/app";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

interface SignUpCardContentProps {
	onSubmit: () => void;
}

export default function SignUpCardContent({
	onSubmit,
}: SignUpCardContentProps) {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [isError, setIsError] = useState(false);

	const passwordsMatch = password === confirmPassword && password !== "";

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await handleSignup({ email, password });
			onSubmit();
		} catch (error: unknown) {
			setIsError(true);
			if (!(error instanceof FirebaseError)) {
				setErrorMessage("エラーが発生しました");
				console.log(error);
				return;
			}
			if (error.code === "auth/email-already-in-use") {
				setErrorMessage("このメールアドレスは既に使用されています");
			} else if (error.code === "auth/weak-password") {
				setErrorMessage("パスワードは6文字以上で設定してください");
			} else if (error.code === "auth/invalid-email") {
				setErrorMessage("メールアドレスの形式が正しくありません");
			} else {
				setErrorMessage("エラーが発生しました");
			}
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="email">メールアドレス</Label>
				<Input
					id="email"
					placeholder="name@example.com"
					required
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="password">パスワード</Label>
				<div className="relative">
					<Input
						id="password"
						required
						type={showPassword ? "text" : "password"}
						placeholder="password"
						className="pr-10"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<ButtonWithTooltip
						description={
							showPassword
								? "パスワードを隠す"
								: "パスワードを表示"
						}
						buttonProps={{
							onClick: () => setShowPassword(!showPassword),
							className:
								"absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none",
							variant: "ghost",
						}}
						content={
							showPassword ? (
								<EyeOffIcon className="h-5 w-5" />
							) : (
								<EyeIcon className="h-5 w-5" />
							)
						}
					/>
				</div>
			</div>
			<div className="space-y-2">
				<Label htmlFor="confirmPassword">パスワード（確認）</Label>
				<div className="relative">
					<Input
						id="confirmPassword"
						required
						type={showPassword ? "text" : "password"}
						placeholder="password"
						className="pr-10"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<ButtonWithTooltip
						description={
							showPassword
								? "パスワードを隠す"
								: "パスワードを表示"
						}
						buttonProps={{
							className:
								"absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none",
							onClick: () => setShowPassword(!showPassword),
							variant: "ghost",
						}}
						content={
							showPassword ? (
								<EyeOffIcon className="h-5 w-5" />
							) : (
								<EyeIcon className="h-5 w-5" />
							)
						}
					/>
				</div>
			</div>
			{password && confirmPassword && !passwordsMatch && (
				<p className="text-sm text-red-500" role="alert">
					パスワードが一致しません
				</p>
			)}
			{isError && (
				<div>
					<p className="text-sm text-red-500">{errorMessage}</p>
				</div>
			)}
			<Button type="submit" className="w-full" disabled={!passwordsMatch}>
				アカウントを作成
			</Button>
		</form>
	);
}
