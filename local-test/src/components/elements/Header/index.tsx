import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

interface HeaderProps {
	title: React.ReactNode;
}

export default function Header({ title }: HeaderProps) {
	return (
		<div className="flex items-center gap-6 p-4 h-14 border-b-2">
			<Link href="/home" className="hover:opacity-70">
				<ArrowLeft className="h-5 w-5" />
			</Link>
			{title}
		</div>
	);
}
