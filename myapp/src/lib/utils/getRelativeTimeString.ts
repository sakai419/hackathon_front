export function getRelativeTimeString(date: Date): string {
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	const intervals = [
		{ seconds: 60 * 60 * 24 * 365, label: "年" },
		{ seconds: 60 * 60 * 24 * 30, label: "ヶ月" },
		{ seconds: 60 * 60 * 24 * 7, label: "週間" },
		{ seconds: 60 * 60 * 24, label: "日" },
		{ seconds: 60 * 60, label: "時間" },
		{ seconds: 60, label: "分" },
	];

	for (const interval of intervals) {
		const count = Math.floor(diffInSeconds / interval.seconds);
		if (count >= 1) {
			return `${count}${interval.label}前`;
		}
	}

	return "たった今";
}
