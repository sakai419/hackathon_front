import React from "react";
import {
	Button,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui";

interface ButtonWithTooltipProps {
	description: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	buttonSize?: "sm" | "lg" | "icon" | "default" | null | undefined;
	buttonClassName?: string;
	content: React.ReactNode;
	variant?:
		| "default"
		| "secondary"
		| "ghost"
		| "link"
		| "destructive"
		| "outline"
		| null
		| undefined;
}

export default function ButtonWithTooltip({
	description,
	onClick,
	onMouseEnter,
	onMouseLeave,
	buttonSize = "sm",
	buttonClassName = "text-primary hover:bg-primary/10 rounded-full",
	content,
	variant = "ghost",
}: ButtonWithTooltipProps) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						size={buttonSize}
						variant={variant}
						className={buttonClassName}
						onClick={onClick}
						type="button"
						onMouseEnter={onMouseEnter}
						onMouseLeave={onMouseLeave}
					>
						{content}
					</Button>
				</TooltipTrigger>
				<TooltipContent className="z-50">
					<p>{description}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
