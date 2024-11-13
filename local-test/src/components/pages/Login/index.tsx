import FormCard from "@/components/elements/FormCard";
import LoginCardContent from "./components/LoginCardContent";

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
				footer={
					<div className="text-sm text-center text-gray-500">
						アカウントをお持ちでない場合は、
						<a
							href="/signup"
							className="text-blue-600 hover:underline"
						>
							新規登録
						</a>
						してください
					</div>
				}
			/>
		</div>
	);
}
