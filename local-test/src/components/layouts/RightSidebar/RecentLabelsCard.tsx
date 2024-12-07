import { ErrorMessage, LoadingScreen } from "@/components/common";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import useRecentLabels from "@/hooks/useRecentLabels";
import { translateLabels } from "@/lib/utils/translate";
import Link from "next/link";

export default function RecentLabelsCard() {
	const { labels, isLoading, error } = useRecentLabels();

	if (error) {
		return <ErrorMessage error={error} />;
	}

	return (
		<>
			{isLoading && <LoadingScreen />}
			<Card>
				<CardHeader>
					<CardTitle>トレンド</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{labels.slice(0, 6).map((label, index: number) => (
						<Link href={`/search?label=${label.label}`} key={index}>
							<div className="my-4">
								<p className="font-semibold">
									{translateLabels(label.label)}
								</p>
								<p className="text-sm text-muted-foreground">
									{label.count}件のツイート
								</p>
							</div>
						</Link>
					))}
				</CardContent>
			</Card>
		</>
	);
}
