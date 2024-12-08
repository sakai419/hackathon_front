import { Header } from "@/components/layouts";
import { Suspense } from "react";
import ReportedUsersCard from "./components/ReportedUsersCard";
import { useClientProfileContext } from "@/context";

export function AdminHeader() {
	return (
		<Header
			title={<h1 className="text-xl font-semibold">管理者ページ</h1>}
		/>
	);
}

export function AdminPage() {
	const { profile } = useClientProfileContext();

	if (!profile?.userInfo.isAdmin) {
		return (
			<div className="text-center">
				<p className="text-3xl">管理者権限がありません</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto py-10">
			<h1 className="text-3xl font-bold mb-6">管理者ダッシュボード</h1>
			<Suspense fallback={<div>読み込み中...</div>}>
				<ReportedUsersCard />
			</Suspense>
		</div>
	);
}
