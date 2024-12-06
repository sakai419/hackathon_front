import { Button } from "@/components/ui";
import { PenSquare } from "lucide-react";

interface TweetButtonProps {
	onClick?: () => void;
	className?: string;
}

export default function TweetButton({
	onClick,
	className = "",
}: TweetButtonProps = {}) {
	return (
		<Button
			className={`bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-4 py-2 rounded-full ${className}`}
			onClick={onClick}
		>
			<PenSquare className="w-4 h-4 mr-2" />
			ツイートする
		</Button>
	);
}
