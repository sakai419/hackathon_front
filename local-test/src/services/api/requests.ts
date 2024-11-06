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
		const response = await axios(config);
		return response;
	} catch (error: any) {
		if (error.response && error.response.status === 403) {
			const newToken = await refreshToken();
			if (newToken) {
				config.headers = {
					...config.headers,
					Authorization: `Bearer ${newToken}`,
				};
				return axios(config);
			}
		}
		throw error;
	}
};
