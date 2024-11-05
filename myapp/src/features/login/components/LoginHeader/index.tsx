import {
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/src/components/ui/card";

export default function LoginHeader() {
	return (
		<CardHeader className="space-y-1">
			<CardTitle className="text-2xl font-bold text-center">
				ログイン
			</CardTitle>
			<CardDescription className="text-center">
				アカウントにログインしてください
			</CardDescription>
		</CardHeader>
	);
}
