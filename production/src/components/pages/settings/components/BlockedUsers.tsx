import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface BlockedUser {
	id: string;
	name: string;
}

export function BlockedUsers() {
	const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([
		{ id: "1", name: "ユーザー1" },
		{ id: "2", name: "ユーザー2" },
		{ id: "3", name: "ユーザー3" },
	]);

	const handleUnblock = (userId: string) => {
		// ここでユーザーのブロック解除APIを呼び出す
		console.log("Unblocking user:", userId);
		setBlockedUsers(blockedUsers.filter((user) => user.id !== userId));
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>ブロックユーザーのリスト</CardTitle>
			</CardHeader>
			<CardContent>
				{blockedUsers.length === 0 ? (
					<p className="text-sm text-muted-foreground">
						ブロックしているユーザーはいません。
					</p>
				) : (
					<ul className="space-y-2">
						{blockedUsers.map((user) => (
							<li
								key={user.id}
								className="flex items-center justify-between"
							>
								<span className="text-sm">{user.name}</span>
								<Button
									variant="outline"
									size="sm"
									onClick={() => handleUnblock(user.id)}
								>
									ブロック解除
								</Button>
							</li>
						))}
					</ul>
				)}
			</CardContent>
		</Card>
	);
}
