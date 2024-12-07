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
	disabledDescription?: string; // disabled時のTooltip内容
	content: React.ReactNode;
	buttonProps?: React.ComponentProps<typeof Button>;
}

export default function ButtonWithTooltip({
	description,
	disabledDescription = "Button is disabled", // デフォルトのdisabled時Tooltip内容
	content,
	buttonProps,
}: ButtonWithTooltipProps) {
	const isDisabled = buttonProps?.disabled;

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<div>
						<Button {...buttonProps}>{content}</Button>
					</div>
				</TooltipTrigger>
				<TooltipContent className="z-50">
					<p>{isDisabled ? disabledDescription : description}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
