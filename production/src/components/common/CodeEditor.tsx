import MonacoEditor from "@monaco-editor/react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import ButtonWithTooltip from "./ButtonWithTooltip";

const LANGUAGES = [
	{ value: "javascript", label: "JavaScript" },
	{ value: "typescript", label: "TypeScript" },
	{ value: "python", label: "Python" },
	{ value: "java", label: "Java" },
	{ value: "c", label: "C" },
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
	language,
	onChange,
	readOnly = false,
}: CodeEditorProps) {
	const handleLanguageChange = (newLanguage: string) => {
		onChange?.(value, newLanguage);
	};

	const handleCodeChange = (newValue: string | undefined) => {
		onChange?.(newValue, language);
	};

	const onExecute = () => {
		console.log("Executed");
	};

	return (
		<div className="border rounded-md overflow-hidden">
			<div className="bg-gray-900 p-2 border-b flex justify-between items-center">
				<div className="flex items-center space-x-2">
					{!readOnly ? (
						<Select
							value={language}
							onValueChange={handleLanguageChange}
						>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="言語を選択" />
							</SelectTrigger>
							<SelectContent>
								{LANGUAGES.map((lang) => (
									<SelectItem
										key={lang.value}
										value={lang.value}
									>
										{lang.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					) : (
						<div className="w-[100px] h-10 px-3 py-2 flex items-center justify-between rounded-md border border-input bg-background text-sm ring-offset-background">
							<span>
								{LANGUAGES.find(
									(lang) => lang.value === language
								)?.label || "言語"}
							</span>
						</div>
					)}
				</div>
				<ButtonWithTooltip
					description="実行"
					buttonProps={{
						className: cn(
							"hover:bg-transparent",
							"text-lime-500 hover:text-lime-400",
							"transition-colors"
						),
						onClick: onExecute,
						variant: "ghost",
					}}
					content={<Play className="w-5 h-5" />}
				/>
			</div>
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
						lineNumbers: "on",
						folding: true,
						renderWhitespace: "boundary",
						cursorStyle: "line",
						cursorSmoothCaretAnimation: "on",
						bracketPairColorization: { enabled: true },
						guides: {
							indentation: true,
							highlightActiveIndentation: true,
						},
						renderLineHighlight: "all",
						glyphMargin: true,
						smoothScrolling: true,
					}}
					theme="vs-dark"
				/>
			</div>
		</div>
	);
}
