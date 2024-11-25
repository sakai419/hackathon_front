import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface HeaderProps {
	title: React.ReactNode;
	withArrow?: boolean;
}

export default function Header({ title, withArrow = true }: HeaderProps) {
	return (
		<header className="fixed top-0 left-72 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-sm">
			<div className="flex items-center gap-6 p-4 h-14 max-w-screen-xl mx-auto">
				{withArrow ? (
					<>
						<Link href="/home" className="hover:opacity-70">
							<ArrowLeft className="h-5 w-5" />
						</Link>
						{title}
					</>
				) : (
					<Link
						href="/home"
						className="hover:opacity-70 text-lg font-semibold"
					>
						{title}
					</Link>
				)}
			</div>
		</header>
	);
}
