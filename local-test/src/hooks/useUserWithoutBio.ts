import { UserInfoWithoutBio } from "@/types/userInfoWithoutBio";
import { useState, useEffect } from "react";

const fetchUserData = async () => {
	await new Promise((resolve) => setTimeout(resolve, 500));
	return {
		UserId: "user123",
		UserName: "山田太郎",
		ProfileImageUrl: "",
		IsPrivate: true,
		IsAdmin: false,
	};
};

export default function useUserInfoWithoutBio(): {
	userInfoWithoutBio: UserInfoWithoutBio | null;
	loading: boolean;
	error: string | null;
} {
	const [userInfoWithoutBio, setUserWithoutBio] =
		useState<UserInfoWithoutBio | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const getUserData = async () => {
			try {
				setLoading(true);
				const userData = await fetchUserData();
				setUserWithoutBio(userData);
			} catch (err) {
				setError("ユーザーデータの取得に失敗しました");
			} finally {
				setLoading(false);
			}
		};

		getUserData();
	}, []);

	return { userInfoWithoutBio, loading, error };
}
