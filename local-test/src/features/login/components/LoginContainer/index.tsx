import { ReactNode } from "react";

export default function LoginContainer({ children }: { children: ReactNode }) {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			{children}
		</div>
	);
}
