import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

interface LoginProps {
	email: string;
	password: string;
}

export const handleLogin = async ({ email, password }: LoginProps) => {
	try {
		const user = await signInWithEmailAndPassword(auth, email, password);
		console.log(user);
		return user;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
