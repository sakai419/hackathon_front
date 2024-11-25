import Header from "@/components/common/Header";
import MainLayout from "@/components/layouts/MainLayout";

export default function HomePage() {
	return (
		<MainLayout
			header={
				<Header
					title={<h1 className="text-xl font-semibold">ホーム</h1>}
					withArrow={false}
				/>
			}
		>
			<div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden"></div>
		</MainLayout>
	);
}
