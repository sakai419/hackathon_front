import { LoadingScreen, UserAvatar } from "@/components/common";
import { Button, Card, CardContent } from "@/components/ui";
import useUserResults from "@/hooks/useUserResults";
import { Lock, Shield } from "lucide-react";
import Link from "next/link";

interface UserResultsProps {
	keyword: string;
}

export default function UserResults({ keyword }: UserResultsProps) {
	const { results, isLoading, hasMore, loadMore, error } = useUserResults({
		keyword,
	});

	if (error) {
		return <div>エラーが発生しました</div>;
	}

	return keyword ? (
		<>
			{isLoading && <LoadingScreen />}
			<div className="divide-y divide-gray-200">
				{results.map((user) => (
					<Link
						href={`/${user.userId}`}
						className="block"
						key={user.userId}
					>
						<Card className="hover:bg-accent transition-colors">
							<CardContent className="p-4">
								<div className="flex items-start space-x-4">
									<UserAvatar
										withLink={false}
										userId={user.userId}
										src={user.profileImageUrl}
										alt={`${user.userName}'s avatar`}
										size="w-12 h-12"
									/>
									<div className="flex-1 min-w-0">
										<div className="flex items-center space-x-2">
											<h3 className="text-sm font-semibold truncate">
												{user.userName}
											</h3>
											{user.isPrivate && (
												<Lock
													className="w-4 h-4 text-gray-500"
													aria-label="Private account"
												/>
											)}
											{user.isAdmin && (
												<Shield
													className="w-4 h-4 text-blue-500"
													aria-label="Admin account"
												/>
											)}
										</div>
										<p className="text-sm text-gray-500 truncate">
											@{user.userId}
										</p>
										<p className="text-sm text-gray-700 mt-1 line-clamp-2">
											{user.bio}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</Link>
				))}
				<Button
					onClick={loadMore}
					disabled={!hasMore}
					className="w-full mt-4"
				>
					{hasMore ? "さらに読み込む" : "検索結果は以上です"}
				</Button>
			</div>
		</>
	) : (
		<div className="text-center text-gray-500">
			キーワードを入力してください
		</div>
	);
}
