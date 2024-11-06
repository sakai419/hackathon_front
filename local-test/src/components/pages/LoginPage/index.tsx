import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
	EmailInput,
	LoginContainer,
	LoginButton,
	LoginHeader,
	PasswordInput,
	SignUpLink,
	WelcomeMessage,
} from "@/features/login/components";

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
		<LoginContainer>
			<WelcomeMessage />
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
		</LoginContainer>
	);
}
