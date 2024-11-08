import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { TabItem } from "@/types/tabItem";

interface DynamicTabsProps {
	tabs: TabItem[];
}

export default function DynamicTabs({ tabs }: DynamicTabsProps) {
	const [activeTab, setActiveTab] = React.useState(tabs[0].Name);

	return (
		<div className="border-b">
			<nav className="flex -mb-px" aria-label="プロフィールタブ">
				{tabs.map((tab) => (
					<Link
						key={tab.Name}
						href={tab.Url}
						className={cn(
							"flex-1 px-4 py-4 text-center text-sm font-medium border-b-2 transition-colors hover:bg-accent/5",
							activeTab === tab.Name
								? "text-primary border-primary"
								: "text-muted-foreground border-transparent hover:border-border"
						)}
						onClick={(e) => {
							e.preventDefault();
							setActiveTab(tab.Name);
						}}
					>
						{tab.Name}
						<span className="sr-only">タブ</span>
					</Link>
				))}
			</nav>
		</div>
	);
}
