import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../firebase/firebase";

export const handleLogin = async (
	email: string,
	password: string,
	router: ReturnType<typeof useRouter>
) => {
	try {
		const user = await signInWithEmailAndPassword(auth, email, password);
		console.log(user);
		router.push("/home");
	} catch (error) {
		console.error(error);
	}
};
