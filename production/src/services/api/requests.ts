import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { auth } from "@/services/firebase/firebase";
import isAPIError from "@/lib/utils/isAPIError";

const refreshToken = async (): Promise<string | null> => {
	const user = auth.currentUser;
	if (user) {
		try {
			const idToken = await user.getIdToken(true);
			return idToken;
		} catch (error) {
			console.error("Failed to refresh token:", error);
			return null;
		}
	}
	return null;
};

export const sendRequestWithRetry = async (config: AxiosRequestConfig) => {
	try {
		const currentUser = auth.currentUser;
		if (!currentUser) {
			throw new Error("User is not authenticated");
		}

		// JWTトークンを取得
		const token = await currentUser.getIdToken();

		// config.headersが未定義の場合も考慮して初期化
		if (!config.headers) {
			config.headers = {};
		}

		// JWTトークンをAuthorizationヘッダーに追加
		config.headers.Authorization = `Bearer ${token}`;

		// リクエストを送信
		const response = await axios(config);
		return response;
	} catch (error: unknown) {
		// トークンが期限切れで403エラーが発生した場合
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError;
			if (
				axiosError.response &&
				axiosError.response.status === 403 &&
				!isAPIError(axiosError.response.data)
			) {
				console.log("Token expired. Refreshing token...");
				const newToken = await refreshToken();
				if (newToken) {
					// 新しいトークンをヘッダーに追加して再送信
					if (!config.headers) {
						config.headers = {};
					}

					config.headers.Authorization = `Bearer ${newToken}`;

					const response = await axios(config);
					return response;
				}
			}
		}
		throw error;
	}
};
