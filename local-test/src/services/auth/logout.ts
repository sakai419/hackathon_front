import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useRouter } from "next/navigation";

export const handleLogout = async (router: ReturnType<typeof useRouter>) => {
	try {
		await signOut(auth);
		router.push("/login");
	} catch (error) {
		console.error(error);
	}
};
