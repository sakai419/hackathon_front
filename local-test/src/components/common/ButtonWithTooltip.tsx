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
	content: React.ReactNode;
	buttonProps?: React.ComponentProps<typeof Button>;
}

export default function ButtonWithTooltip({
	description,
	content,
	buttonProps,
}: ButtonWithTooltipProps) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button {...buttonProps}>{content}</Button>
				</TooltipTrigger>
				<TooltipContent className="z-50">
					<p>{description}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
