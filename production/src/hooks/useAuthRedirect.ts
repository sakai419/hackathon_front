import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/services/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export function useAuthRedirect() {
	const router = useRouter();
	const pathname = usePathname();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				if (pathname === "/login") {
					router.push("/home"); // ログイン済みなら/homeにリダイレクト
				}
			} else {
				if (pathname !== "/login") {
					router.push("/login"); // 未ログインなら/loginにリダイレクト
				}
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, [pathname, router]);

	return { loading };
}
