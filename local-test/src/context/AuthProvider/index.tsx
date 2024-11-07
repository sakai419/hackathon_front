"use client";

import { auth } from "@/services/auth/firebase";
import { User } from "firebase/auth";
import {
	useState,
	useEffect,
	createContext,
	useContext,
	ReactNode,
} from "react";

// ユーザー情報を保持するコンテキスト
interface AuthContextProps {
	currentUser: User | null;
	loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
	currentUser: null,
	loading: true,
});

// 認証プロバイダーを作成
export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		// クリーンアップ
		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider value={{ currentUser, loading }}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

// 認証情報を取得するカスタムフック
export const useAuth = () => {
	return useContext(AuthContext);
};
