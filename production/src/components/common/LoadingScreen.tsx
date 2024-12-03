import { cn } from "@/lib/utils";

export default function LoadingScreen() {
	return (
		<div className="min-h-screen mx-auto bg-white flex flex-col items-center justify-center">
			<div className="relative h-16 w-16">
				{Array.from({ length: 8 }).map((_, i) => (
					<div
						key={i}
						className={cn(
							"absolute h-4 w-4 rounded-full",
							"animate-[loading_1s_ease-in-out_infinite]",
							"bg-gray-300"
						)}
						style={{
							top: `${Math.sin((i * Math.PI) / 4) * 24}px`,
							left: `${Math.cos((i * Math.PI) / 4) * 24}px`,
							animationDelay: `${i * 0.125}s`,
						}}
					/>
				))}
			</div>
			<p className="mt-4 text-xl text-gray-800 animate-pulse -translate-x-4">
				Now Loading...
			</p>
			<style jsx global>{`
				@keyframes loading {
					0%,
					100% {
						opacity: 0.3;
					}
					50% {
						opacity: 1;
					}
				}
			`}</style>
		</div>
	);
}
