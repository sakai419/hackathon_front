import Header from "@/components/layouts/Header";

export function HomeHeader() {
	return (
		<Header
			title={<h1 className="text-xl font-semibold">ホーム</h1>}
			withArrow={false}
		/>
	);
}

export function HomePage() {
	return (
		<div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden"></div>
	);
}
