import { APIError } from "@/types/error";

export default function isAPIError(arg: unknown): arg is APIError {
	if (typeof arg !== "object" || arg === null) {
		return false; // argがオブジェクトでない場合はAPIErrorではない
	}

	const apiError = arg as Partial<APIError>; // 部分型として扱う
	return (
		typeof apiError.code === "string" && // codeが数値型
		typeof apiError.message === "string" // messageが文字列型
	);
}
