import React from "react";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
	return (
		<div className="fixed inset-0 z-[-1] overflow-hidden bg-sky-50">
			<motion.div
				className="absolute top-[-50%] left-[-50%] right-[-50%] bottom-[-50%] bg-gradient-to-br from-sky-200 via-sky-500 to-white"
				animate={{
					scale: [1, 1.1, 1.05, 1],
					rotate: [0, 45, 90, 135, 180],
				}}
				transition={{
					duration: 20,
					ease: "linear",
					repeat: Infinity,
				}}
			/>
			<div className="absolute inset-0 opacity-40">
				<div
					className="absolute w-[100vw] h-[100vw] bg-sky-100 rounded-full blur-3xl"
					style={{
						top: "-50vw",
						left: "-50vw",
						animation: "pulse 15s infinite alternate",
					}}
				/>
				<div
					className="absolute w-[100vw] h-[100vw] bg-white rounded-full blur-3xl"
					style={{
						bottom: "-50vw",
						right: "-50vw",
						animation: "pulse 18s infinite alternate-reverse",
					}}
				/>
			</div>
		</div>
	);
}
