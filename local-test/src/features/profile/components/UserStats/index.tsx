interface UserProfileProps {
	followers: number;
	following: number;
	posts: number;
}

export default function UserStats({
	followers,
	following,
	posts,
}: UserProfileProps) {
	return (
		<div className="flex gap-4 mt-4 text-muted-foreground">
			<span>
				<strong className="text-foreground">{posts}</strong> 投稿
			</span>
			<span>
				<strong className="text-foreground">{followers}</strong>{" "}
				フォロワー
			</span>
			<span>
				<strong className="text-foreground">{following}</strong>{" "}
				フォロー中
			</span>
		</div>
	);
}
