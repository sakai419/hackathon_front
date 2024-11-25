import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const LANGUAGES = [
	{ value: "javascript", label: "JavaScript" },
	{ value: "typescript", label: "TypeScript" },
	{ value: "python", label: "Python" },
	{ value: "java", label: "Java" },
	{ value: "csharp", label: "C#" },
	{ value: "cpp", label: "C++" },
	{ value: "go", label: "Go" },
	{ value: "rust", label: "Rust" },
	{ value: "ruby", label: "Ruby" },
	{ value: "php", label: "PHP" },
];

interface CodeEditorProps {
	value: string;
	language: string;
	onChange?: (value: string | undefined, language: string) => void;
	readOnly?: boolean;
}

export default function CodeEditor({
	value,
	language: initialLanguage,
	onChange,
	readOnly = false,
}: CodeEditorProps) {
	const [language, setLanguage] = useState(initialLanguage);

	const handleLanguageChange = (newLanguage: string) => {
		setLanguage(newLanguage);
		onChange?.(value, newLanguage);
	};

	const handleCodeChange = (newValue: string | undefined) => {
		onChange?.(newValue, language);
	};

	return (
		<div className="border rounded-md overflow-hidden">
			{!readOnly && (
				<div className="bg-gray-100 p-2 border-b">
					<Select
						value={language}
						onValueChange={handleLanguageChange}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="言語を選択" />
						</SelectTrigger>
						<SelectContent>
							{LANGUAGES.map((lang) => (
								<SelectItem key={lang.value} value={lang.value}>
									{lang.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			)}
			<div
				onClick={(e) => {
					e.stopPropagation();
					e.preventDefault();
				}}
			>
				<MonacoEditor
					height="400px"
					language={language}
					value={value}
					onChange={handleCodeChange}
					options={{
						readOnly: readOnly,
						wordWrap: "on",
						minimap: { enabled: false },
						scrollBeyondLastLine: true,
						automaticLayout: true,
						fontSize: 14,
						fontFamily: "JetBrains Mono",
					}}
					theme="vs-dark"
				/>
			</div>
		</div>
	);
}
