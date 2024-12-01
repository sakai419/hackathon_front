import { handleLogin } from "@/services/auth/login";
import { Label } from "@radix-ui/react-label";
import { Input, Button } from "@/components/ui";
import { useState } from "react";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginCardContent() {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isError, setIsError] = useState(false);

	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await handleLogin({ email, password });
			router.push("/home");
		} catch (error) {
			console.log(error);
			setIsError(true);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="email">メールアドレス</Label>
				<Input
					id="email"
					type="email"
					placeholder="name@example.com"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="password">パスワード</Label>
				<div className="relative">
					<Input
						id="password"
						type={showPassword ? "text" : "password"}
						placeholder="••••••••"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="pr-10 w-full"
					/>
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
						aria-label={
							showPassword
								? "パスワードを隠す"
								: "パスワードを表示"
						}
					>
						{showPassword ? (
							<EyeOffIcon className="h-5 w-5" />
						) : (
							<EyeIcon className="h-5 w-5" />
						)}
					</button>
				</div>
			</div>
			{isError && (
				<span className="text-sm text-red-600">
					Eメールまたはパスワードが間違っています
				</span>
			)}
			<Button type="submit" className="w-full">
				ログイン
			</Button>
		</form>
	);
}
