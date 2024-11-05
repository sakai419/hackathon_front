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

	const togglePasswordVisibility = () => setShowPassword(!showPassword);

	return (
		<LoginContainer>
			<WelcomeMessage />
			<Card className="w-full max-w-md">
				<LoginHeader />
				<CardContent className="space-y-4">
					<EmailInput />
					<PasswordInput
						showPassword={showPassword}
						togglePasswordVisibility={togglePasswordVisibility}
					/>
				</CardContent>
				<CardFooter className="flex flex-col space-y-4">
					<LoginButton />
					<SignUpLink />
				</CardFooter>
			</Card>
		</LoginContainer>
	);
}
