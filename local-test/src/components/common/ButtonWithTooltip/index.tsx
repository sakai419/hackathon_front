import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

interface ButtonWithTooltipProps {
	description: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	buttonSize?: "sm" | "lg" | "icon" | "default" | null | undefined;
	buttonClassName?: string;
	content: React.ReactNode;
}

export default function ButtonWithTooltip({
	description,
	onClick,
	buttonSize = "sm",
	buttonClassName = "text-primary hover:bg-primary/10 rounded-full",
	content,
}: ButtonWithTooltipProps) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						size={buttonSize}
						variant="ghost"
						className={buttonClassName}
						onClick={onClick}
					>
						{content}
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>{description}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
