export function validateUserId(userId: string) {
	const validPattern = /^[a-zA-Z0-9._-]+$/;
	if (!validPattern.test(userId)) {
		return false;
	}
	return true;
}
