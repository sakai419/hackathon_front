"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function Component() {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => setShowPassword(!showPassword);

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center">
						ログイン
					</CardTitle>
					<CardDescription className="text-center">
						アカウントにログインしてください
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email">メールアドレス</Label>
						<Input
							id="email"
							type="email"
							placeholder="name@example.com"
							required
						/>
					</div>
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
				</CardContent>
				<CardFooter className="flex flex-col space-y-4">
					<Button className="w-full">ログイン</Button>
					<div className="text-sm text-center text-gray-500">
						アカウントをお持ちでない場合は
						<a href="#" className="text-blue-600 hover:underline">
							新規登録
						</a>
						してください
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
