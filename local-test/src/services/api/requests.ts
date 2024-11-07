import axios, { AxiosRequestConfig } from "axios";
import { auth } from "@/services/auth/firebase";

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
	} catch (error: any) {
		// トークンが期限切れで403エラーが発生した場合
		if (error.response && error.response.status === 403) {
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
		// その他のエラーはそのままスロー
		throw error;
	}
};
