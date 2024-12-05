export function validateUserId(userId: string) {
	const validPattern = /^[a-zA-Z0-9._-]+$/;
	if (!validPattern.test(userId)) {
		return false;
	}
	return true;
}

export function validateMessage(message: string) {
	if (!message) {
		return false;
	}

	// 半角および全角空白を全て取り除いた結果が空ならfalseを返す
	const trimmedMessage = message.replace(/[\s　]/g, "");
	return trimmedMessage.length > 0;
}
