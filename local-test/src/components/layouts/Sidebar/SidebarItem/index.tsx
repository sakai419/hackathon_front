import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
	icon: React.ElementType;
	label: string;
	href: string;
}

export default function SidebarItem({
	icon: Icon,
	label,
	href,
}: SidebarItemProps) {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<Button
			variant="ghost"
			className={`w-full justify-start text-lg font-bold ${
				isActive
					? "bg-primary text-primary-foreground"
					: "hover:bg-primary/10"
			}`}
			asChild
		>
			<Link href={href}>
				<Icon
					className={`mr-2 h-5 w-5 ${
						isActive ? "text-primary-foreground" : "text-primary"
					}`}
				/>
				<span>{label}</span>
			</Link>
		</Button>
	);
}
