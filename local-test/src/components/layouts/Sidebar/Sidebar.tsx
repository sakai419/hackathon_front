import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import SidebarContent from "./SidebarContent";

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button
				variant="outline"
				size="icon"
				className="fixed top-4 left-4 z-50 md:hidden"
				onClick={() => setIsOpen(!isOpen)}
				aria-label={isOpen ? "サイドバーを閉じる" : "サイドバーを開く"}
			>
				<MenuIcon className="h-4 w-4" />
			</Button>
			<div
				className={`fixed top-0 left-0 h-full bg-background p-4 shadow-lg transition-all duration-300 ease-in-out ${
					isOpen ? "w-72" : "w-0 md:w-72"
				}`}
			>
				<div
					className={`overflow-hidden ${
						isOpen ? "w-64" : "w-0 md:w-64"
					}`}
				>
					<SidebarContent />
				</div>
			</div>
		</>
	);
}
