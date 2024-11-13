import { Button } from "@/components/ui/button";
import { handleLogin } from "@/services/auth/login";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
	email: string;
	password: string;
}

export default function LoginButton({ email, password }: LoginButtonProps) {
	const router = useRouter();

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		try {
			await handleLogin({ email, password });
			router.push("/home");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Button className="w-full" onClick={handleSubmit}>
			ログイン
		</Button>
	);
}
