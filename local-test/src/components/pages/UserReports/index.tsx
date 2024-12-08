import { Suspense } from "react";
import UserReportsCard from "./components/UserReportsCard";

interface UserReportsPageProps {
	userId: string;
}

export default function UserReportsPage({ userId }: UserReportsPageProps) {
	return (
		<div className="container mx-auto py-10">
			<h1 className="text-3xl font-bold mb-6">ユーザー通報一覧</h1>
			<Suspense fallback={<div>読み込み中...</div>}>
				<UserReportsCard userId={userId} />
			</Suspense>
		</div>
	);
}
