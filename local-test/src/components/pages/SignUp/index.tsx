import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import EmailInput from "../Login/components/EmailInput";
import LoginButton from "../Login/components/LoginButton";
import LoginHeader from "../Login/components/LoginHeader";
import PasswordInput from "../Login/components/PasswordInput";
import SignUpLink from "../Login/components/SignUpLink";

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const togglePasswordVisibility = () => setShowPassword(!showPassword);
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setEmail(e.target.value);
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setPassword(e.target.value);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<h1 className="text-3xl font-bold text-center text-primary mb-6">
				Welcome to my app!!!
			</h1>
			<Card className="w-full max-w-md">
				<LoginHeader />
				<CardContent className="space-y-4">
					<EmailInput value={email} onChange={handleEmailChange} />
					<PasswordInput
						showPassword={showPassword}
						togglePasswordVisibility={togglePasswordVisibility}
						value={password}
						onChange={handlePasswordChange}
					/>
				</CardContent>
				<CardFooter className="flex flex-col space-y-4">
					<LoginButton email={email} password={password} />
					<SignUpLink />
				</CardFooter>
			</Card>
		</div>
	);
}
