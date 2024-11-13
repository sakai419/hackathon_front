import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

interface SignupProps {
	email: string;
	password: string;
}

export default async function handleSignup({ email, password }: SignupProps) {
	try {
		const user = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		console.log(user);
		return null;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
