import { Lock, UserX } from "lucide-react";

export default function FallbackTweet() {
	return (
		<div className="flex items-center space-x-4">
			<div className="bg-muted rounded-full p-2">
				<UserX className="w-6 h-6 text-muted-foreground" />
			</div>
			<div>
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
	);
}
