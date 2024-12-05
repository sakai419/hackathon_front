import { AvatarFallback } from "@radix-ui/react-avatar";
import { Lock, UserX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "../ui";

interface FallbackTweetProps {
	showThreadLine: boolean;
}

export default function FallbackTweet({ showThreadLine }: FallbackTweetProps) {
	const componentRef = useRef<HTMLDivElement>(null);
	const [threadLineHeight, setThreadLineHeight] = useState(0);

	useEffect(() => {
		if (showThreadLine && componentRef.current) {
			const height = componentRef.current.clientHeight;
			setThreadLineHeight(height);
		}
	}, [showThreadLine]);

	return (
		<div
			className="relative flex flex-shrink-0 items-start space-x-2 hover:bg-gray-100 p-4"
			ref={componentRef}
		>
			<div className="relative">
				<Avatar className="w-10 h-10 border-2 bg-gray-200 items-center justify-center">
					<AvatarFallback>
						<UserX className="w-5 h-5 text-gray-500" />
					</AvatarFallback>
				</Avatar>
				{showThreadLine && (
					<div
						className="absolute left-1/2 top-12 w-0.5 bg-gray-500"
						style={{
							height: `${Math.max(threadLineHeight - 48, 0)}px`,
							transform: "translateX(-50%)",
						}}
					/>
				)}
			</div>
			<div className="flex-1">
				<div className="mt-2 space-y-4">
					<h2 className="text-lg font-semibold mb-2">
						このツイートは表示できません
					</h2>
					<p className="text-sm text-muted-foreground">
						以下の理由により、このコンテンツを表示できない可能性があります：
					</p>
					<ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
						<li>あなたがブロックされている</li>
						<li>あなたが投稿者をブロックしている</li>
						<li>
							<span className="inline-flex items-center">
								アカウントが非公開
								<Lock className="w-4 h-4 ml-1" />
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
