import { Header } from "@/components/layouts";

interface EngagementPageProps {
	tweetId: number;
}

export function EngagementsHeader() {
	return (
		<Header
			title={
				<h1 className="text-xl font-semibold">
					ツイートのエンゲージメント
				</h1>
			}
		/>
	);
}

export function EngagementsPage({ tweetId }: EngagementPageProps) {
	return (
		<div>
			<p>{tweetId}</p>
		</div>
	);
}
