import Sidebar from "./Sidebar";

interface MainLayoutProps {
	children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
	return (
		<div className="flex">
			<Sidebar />
			<div className="flex-grow">
				<main>{children}</main>
			</div>
		</div>
	);
}
