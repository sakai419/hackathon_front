import FormCard from "@/components/common/FormCard";
import LoginCardContent from "./components/LoginCardContent";
import SignUpLink from "./components/SignUpLink";

export default function LoginPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<h1 className="text-3xl font-bold text-center text-primary mb-6">
				Welcome to my app!!!
			</h1>
			<FormCard
				title="ログイン"
				description="アカウントにログインしてください"
				content={<LoginCardContent />}
				footer={<SignUpLink />}
			/>
		</div>
	);
}
