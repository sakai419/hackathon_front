import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { translateLabels } from "@/lib/utils/translate";
import { LabelCount } from "@/types/label";
import Link from "next/link";

interface RecentLabelsCardProps {
	labels: LabelCount[];
}

export default function RecentLabelsCard({ labels }: RecentLabelsCardProps) {
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>トレンド</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<h1 className="font-bold">上位5つのラベル</h1>
					{labels.slice(0, 5).map((label, index: number) => (
						<Link href={`/search?label=${label.label}`} key={index}>
							<div className="my-4">
								<p className="font-semibold hover:underline">
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
