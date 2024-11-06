import { User } from "@/types/user";
import { useState, useEffect } from "react";

const fetchUserData = async () => {
	await new Promise((resolve) => setTimeout(resolve, 500));
	return {
		id: "user123",
		name: "山田太郎",
		profileImage: "/placeholder.svg?height=40&width=40",
		isPrivate: true,
	};
};

export default function useUser(): {
	user: User | null;
	loading: boolean;
	error: string | null;
} {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const getUserData = async () => {
			try {
				setLoading(true);
				const userData = await fetchUserData();
				setUser(userData);
			} catch (err) {
				setError("ユーザーデータの取得に失敗しました");
			} finally {
				setLoading(false);
			}
		};

		getUserData();
	}, []);

	return { user, loading, error };
}
