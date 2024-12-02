import Link from "next/link";

interface EngagementLinkProps {
	tweetId: number;
}

export default function EngagementLink({ tweetId }: EngagementLinkProps) {
	return (
		<Link href={`/tweets/${tweetId}/engagements`}>
			<div className="text-blue-500 cursor-pointer">エンゲージメント</div>
		</Link>
	);
}
