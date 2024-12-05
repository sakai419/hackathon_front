import { ErrorMessage, LoadingScreen } from "@/components/common";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import useRecentLabels from "@/hooks/useRecentLabels";
import { translateLabels } from "@/lib/utils/translate";

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
					{labels.map((label, index) => (
						<div key={index} className="space-y-1">
							<p className="font-semibold">
								{translateLabels(label.label)}
							</p>
							<p className="text-sm text-muted-foreground">
								{label.count}件のツイート
							</p>
						</div>
					))}
				</CardContent>
			</Card>
		</>
	);
}
