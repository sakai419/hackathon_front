import * as React from "react";
import { cn } from "@/lib/utils";

interface DynamicTabsProps {
	tabNames: string[];
	activeTab: string;
	setActiveTab: (tabName: string) => void;
}

export default function DynamicTabs({
	tabNames,
	activeTab,
	setActiveTab,
}: DynamicTabsProps) {
	return (
		<div className="border-b">
			<nav className="flex -mb-px">
				{tabNames.map((tabName) => (
					<div
						key={tabName}
						className={cn(
							"flex-1 px-4 py-4 text-center text-sm font-medium border-b-2 transition-colors hover:bg-accent/5",
							activeTab === tabName
								? "text-primary border-primary border-b-4"
								: "text-muted-foreground border-transparent hover:border-border"
						)}
						onClick={(e) => {
							e.preventDefault();
							setActiveTab(tabName);
						}}
					>
						{tabName}
						<span className="sr-only">タブ</span>
					</div>
				))}
			</nav>
		</div>
	);
}
