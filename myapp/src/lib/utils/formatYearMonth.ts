export default function formatYearMonth(isoString: string): string {
	const date = new Date(isoString);
	const year = date.getFullYear(); // 年を取得
	const month = date.getMonth() + 1; // 月は0から始まるので+1
	return `${year}年${month}月`;
}
