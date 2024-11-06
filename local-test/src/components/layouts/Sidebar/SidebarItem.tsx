import { Button } from "@/components/ui/button";

interface SidebarItemProps {
	icon: React.ElementType;
	label: string;
}

export default function SidebarItem({ icon: Icon, label }: SidebarItemProps) {
	return (
		<Button variant="ghost" className="w-full justify-start">
			<Icon className="mr-2 h-4 w-4" />
			<span>{label}</span>
		</Button>
	);
}
