import { UserInfoWithoutBio } from "@/types/userInfoWithoutBio";
import { useState, useEffect } from "react";
import FollowSuggestsCard from "./FollowSuggestsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

interface FollowSuggestListProps {
	followSuggestions: UserInfoWithoutBio[];
}

export default function FollowSuggestList({
	followSuggestions,
}: FollowSuggestListProps) {
	const [suggestedUsers, setSuggestedUsers] =
		useState<UserInfoWithoutBio[]>(followSuggestions);

	useEffect(() => {
		setSuggestedUsers(followSuggestions);
	}, [followSuggestions]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>おすすめユーザー</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-muted-foreground">
					あなたのフォロワーがフォローしているユーザーが表示されます
				</p>
				{followSuggestions.length > 0 ? (
					<div className="divide-y divide-gray-200">
						{suggestedUsers.map((user) => (
							<FollowSuggestsCard key={user.userId} user={user} />
						))}
					</div>
				) : (
					<div className="p-4 text-center text-muted-foreground">
						おすすめユーザーはいません
					</div>
				)}
			</CardContent>
		</Card>
	);
}
