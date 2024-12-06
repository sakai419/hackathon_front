"use client";

export default function EngagementsLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="flex h-screen">
			<div className="flex flex-col flex-grow">
				<main className="flex-grow overflow-auto mt-14">
					{children}
				</main>
			</div>
		</div>
	);
}
