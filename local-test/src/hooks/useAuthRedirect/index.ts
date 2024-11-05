import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export function useAuthRedirect() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				router.push("/home");
			} else {
				router.push("/login");
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, [router]);

	return { loading };
}
