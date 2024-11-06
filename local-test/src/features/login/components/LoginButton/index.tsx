import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
	email: string;
	password: string;
}

const handleLogin = async (
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

export default function LoginButton({ email, password }: LoginButtonProps) {
	const router = useRouter();
	return (
		<Button
			className="w-full"
			onClick={() => handleLogin(email, password, router)}
		>
			ログイン
		</Button>
	);
}
