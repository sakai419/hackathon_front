import { Shield, UserX, Lock } from "lucide-react";
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui";

interface AccessErrorMessageProps {
	userId: string;
	status: "blocked" | "blocking" | "private";
	onUnblock?: () => void;
}

export function AccessErrorMessage({
	userId,
	status,
	onUnblock,
}: AccessErrorMessageProps) {
	const getContent = () => {
		switch (status) {
			case "blocked":
				return {
					icon: <Shield className="w-12 h-12 text-primary" />,
					title: `@${userId}さんにブロックされています`,
					message: "このアカウントのツイートは表示できません。",
					detail: "ブロックされたアカウントのプロフィールを見ることはできません。ブロックについての詳細は、ヘルプセンターをご覧ください。",
				};
			case "blocking":
				return {
					icon: <UserX className="w-12 h-12 text-primary" />,
					title: `あなたは@${userId}さんをブロックしています`,
					message: "このアカウントのツイートは表示されません。",
					detail: "ブロックを解除すると、このアカウントのツイートを再び見ることができます。",
				};
			case "private":
				return {
					icon: <Lock className="w-12 h-12 text-primary" />,
					title: `@${userId}さんのツイートは非公開です`,
					message: "フォローするとツイートを見ることができます。",
					detail: "このアカウントのツイートを見るには、フォローリクエストを送信し、承認を待つ必要があります。",
				};
		}
	};

	const content = getContent();

	return (
		<Card className="max-w-[500px] w-full mx-auto">
			<CardHeader className="text-center">
				<div className="mx-auto mb-4">{content.icon}</div>
				<CardTitle className="text-xl font-bold">
					{content.title}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-center text-muted-foreground mb-4">
					{content.message}
				</p>
				<p className="text-sm text-muted-foreground mb-6">
					{content.detail}
				</p>
				{status === "blocking" && (
					<div className="text-center">
						<Button onClick={onUnblock} variant="outline">
							ブロックを解除
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
