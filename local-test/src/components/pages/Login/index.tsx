import { AnimatedBackground, FormCard } from "@/components/common";
import LoginCardContent from "./components/LoginCardContent";
import SignUpLink from "./components/SignUpLink";

export default function LoginPage() {
	return (
		<>
			<AnimatedBackground />
			<FormCard
				title="ログイン"
				description="アカウントにログインしてください"
				content={<LoginCardContent />}
				footer={<SignUpLink />}
			/>
		</>
	);
}
