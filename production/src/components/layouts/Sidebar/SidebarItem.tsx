import { Button } from "@/components/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
	icon: React.ElementType;
	label: string;
	href: string;
	count?: number;
}

export default function SidebarItem({
	icon: Icon,
	label,
	href,
	count,
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
			<Link
				href={href}
				className="flex items-center justify-between w-full"
			>
				<div className="flex items-center">
					<Icon
						className={`mr-2 h-5 w-5 ${
							isActive
								? "text-primary-foreground"
								: "text-primary"
						}`}
					/>
					<span>{label}</span>
				</div>
				{count !== undefined && count !== 0 && (
					<span
						className={`ml-auto text-xs w-4 h-4 text-center rounded-full ${
							isActive
								? "bg-primary-foreground text-primary"
								: "bg-primary text-primary-foreground"
						}`}
					>
						{count}
					</span>
				)}
			</Link>
		</Button>
	);
}
