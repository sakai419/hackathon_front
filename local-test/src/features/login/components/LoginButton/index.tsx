import { Button } from "@/components/ui/button";
import { handleLogin } from "@/services/auth/login";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
	email: string;
	password: string;
}

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
