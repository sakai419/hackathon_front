import MonacoEditor from "@monaco-editor/react";
import {
	Alert,
	AlertDescription,
	AlertTitle,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import ButtonWithTooltip from "./ButtonWithTooltip";
import { ExecuteResult } from "@/types/execute";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import executeCode from "@/services/api/execute/executeCode";

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
	const [executeResult, setExecuteResult] = useState<ExecuteResult>();
	const [error, setError] = useState<unknown>(null);

	const handleLanguageChange = (newLanguage: string) => {
		onChange?.(value, newLanguage);
	};

	const handleCodeChange = (newValue: string | undefined) => {
		onChange?.(newValue, language);
	};

	const onExecute = async () => {
		try {
			setExecuteResult(undefined);
			const res = await executeCode({ language, content: value });
			setExecuteResult(res);
		} catch (error) {
			setError(error);
		}
	};

	if (error) {
		return <ErrorMessage error={error} />;
	}

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
					disabledDescription="現在実行できるのは C 言語のみです"
					buttonProps={{
						className: cn(
							"hover:bg-transparent",
							"text-lime-500 hover:text-lime-400",
							"transition-colors"
						),
						onClick: onExecute,
						variant: "ghost",
						disabled: language !== "c",
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

			{executeResult && (
				<div className="p-4 bg-gray-100 border-t">
					<Alert
						variant={
							executeResult.status === "success"
								? "default"
								: "destructive"
						}
					>
						<AlertTitle>{executeResult.status}</AlertTitle>
						<AlertDescription>
							{executeResult.output && (
								<pre className="mt-2 whitespace-pre-wrap">
									{executeResult.output}
								</pre>
							)}
							{executeResult.message && (
								<p className="mt-2">{executeResult.message}</p>
							)}
						</AlertDescription>
					</Alert>
				</div>
			)}
		</div>
	);
}
