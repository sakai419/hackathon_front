import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeOffIcon, EyeIcon } from "lucide-react";

interface PasswordInputProps {
	showPassword: boolean;
	togglePasswordVisibility: () => void;
}

export default function PasswordInput({
	showPassword,
	togglePasswordVisibility,
}: PasswordInputProps) {
	return (
		<div className="space-y-2">
			<Label htmlFor="password">パスワード</Label>
			<div className="relative">
				<Input
					id="password"
					type={showPassword ? "text" : "password"}
					placeholder="••••••••"
					required
				/>
				<button
					type="button"
					onClick={togglePasswordVisibility}
					className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
					aria-label={
						showPassword ? "パスワードを隠す" : "パスワードを表示"
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
	);
}
