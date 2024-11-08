import { UserWithoutBio } from "@/types/userInfoWithoutBio";
import { useState, useEffect } from "react";

const fetchUserData = async () => {
	await new Promise((resolve) => setTimeout(resolve, 500));
	return {
		userId: "user123",
		userName: "山田太郎",
		profileImageUrl: "",
		isPrivate: true,
		isAdmin: false,
	};
};

export default function useUserWithoutBio(): {
	userWithoutBio: UserWithoutBio | null;
	loading: boolean;
	error: string | null;
} {
	const [userWithoutBio, setUserWithoutBio] = useState<UserWithoutBio | null>(
		null
	);
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

	return { userWithoutBio, loading, error };
}
