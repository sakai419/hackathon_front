"use client";

export default function EngagementsLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="flex">
			<div className="flex-grow">
				<main>{children}</main>
			</div>
		</div>
	);
}
