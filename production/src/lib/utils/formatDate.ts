export default function formatDate(date: Date): string {
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (diffInSeconds < 60) return `${diffInSeconds}秒前`;
	if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}分前`;
	if (diffInSeconds < 86400)
		return `${Math.floor(diffInSeconds / 3600)}時間前`;
	if (diffInSeconds < 2592000)
		return `${Math.floor(diffInSeconds / 86400)}日前`;

	return date.toLocaleDateString("ja-JP", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}
