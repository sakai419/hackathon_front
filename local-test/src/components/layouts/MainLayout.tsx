import Sidebar from "./Sidebar";

interface MainLayoutProps {
	children: React.ReactNode;
	header: React.ReactNode;
}

export default function MainLayout({ children, header }: MainLayoutProps) {
	return (
		<div className="flex">
			<Sidebar />
			{header}
			<div className="flex-grow">
				<main className="ml-64 pt-14 p-4">{children}</main>
			</div>
		</div>
	);
}
