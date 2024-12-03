import { BarChart3 } from "lucide-react";
import Link from "next/link";

interface EngagementLinkProps {
	tweetId: number;
}

export default function EngagementLink({ tweetId }: EngagementLinkProps) {
	return (
		<Link href={`/tweets/${tweetId}/engagements`}>
			<div className="flex items-center gap-2 px-4 py-3 text-gray-600 border-t -mt-px border-b hover:bg-gray-50 cursor-pointer transition-colors">
				<BarChart3 className="w-5 h-5" />
				<span className="text-sm">ポストのエンゲージメントを表示</span>
			</div>
		</Link>
	);
}
