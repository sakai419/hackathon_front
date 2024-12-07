import { useState, useEffect } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { Extension } from "@codemirror/state";
import ErrorMessage from "./ErrorMessage";
import executeCode from "@/services/api/execute/executeCode";
import { ExecuteResult } from "@/types/execute";
import ButtonWithTooltip from "./ButtonWithTooltip";

interface CodeEditorProps {
	readOnly?: boolean;
	language: string;
	value: string;
	onChange?: (value: string | undefined, language: string) => void;
}

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

export default function CodeEditor({
	readOnly = false,
	language,
	value,
	onChange,
}: CodeEditorProps) {
	const [executeResult, setExecuteResult] = useState<ExecuteResult | null>(
		null
	);
	const [isExecuting, setIsExecuting] = useState(false);
	const [extensions, setExtensions] = useState<Extension[]>([javascript()]);
	const [error, setError] = useState<unknown>(null);

	const handleLanguageChange = (newLanguage: string) => {
		onChange?.(value, newLanguage);
	};

	const handleCodeChange = (newValue: string | undefined) => {
		onChange?.(newValue, language);
	};

	useEffect(() => {
		switch (language) {
			case "javascript":
				setExtensions([javascript()]);
				break;
			case "python":
				setExtensions([python()]);
				break;
			case "java":
				setExtensions([java()]);
				break;
			case "c":
			case "cpp":
				setExtensions([cpp()]);
				break;
			default:
				setExtensions([javascript()]);
		}
	}, [language]);

	const handleExecute = async () => {
		try {
			setIsExecuting(true);
			setExecuteResult(null);
			const res = await executeCode({ language, content: value });
			setExecuteResult(res);
		} catch (error) {
			setError(error);
		} finally {
			setIsExecuting(false);
		}
	};

	if (error) {
		return <ErrorMessage error={error} />;
	}

	return (
		<div className="border rounded-md overflow-hidden">
			<div className="bg-gray-100 p-2 border-b flex justify-between items-center">
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
						<div className="w-[180px] h-10 px-3 py-2 flex items-center justify-between rounded-md border border-input bg-background text-sm ring-offset-background">
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
						onClick: handleExecute,
						variant: "ghost",
						disabled: language !== "c" || isExecuting,
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
				<CodeMirror
					value={value}
					height="400px"
					theme={vscodeDark}
					extensions={extensions}
					onChange={handleCodeChange}
					editable={!readOnly}
					basicSetup={{
						lineNumbers: true,
						highlightActiveLineGutter: true,
						highlightSpecialChars: true,
						history: true,
						foldGutter: true,
						drawSelection: true,
						dropCursor: true,
						allowMultipleSelections: true,
						indentOnInput: true,
						syntaxHighlighting: true,
						bracketMatching: true,
						closeBrackets: true,
						autocompletion: true,
						rectangularSelection: true,
						crosshairCursor: true,
						highlightActiveLine: true,
						highlightSelectionMatches: true,
						closeBracketsKeymap: true,
						defaultKeymap: true,
						searchKeymap: true,
						historyKeymap: true,
						foldKeymap: true,
						completionKeymap: true,
						lintKeymap: true,
					}}
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
