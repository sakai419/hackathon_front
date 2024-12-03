import MonacoEditor from "@monaco-editor/react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui";
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
						wordWrap: "on", // 行の折り返しを有効化
						minimap: { enabled: false }, // ミニマップを無効化（表示する場合は true）
						scrollBeyondLastLine: true, // 最終行の下に余白を表示
						automaticLayout: true, // レイアウトの自動調整を有効化
						fontSize: 14, // フォントサイズ
						fontFamily: "JetBrains Mono", // モノスペースフォントを指定
						lineNumbers: "on", // 行番号を表示
						folding: true, // コードの折りたたみを有効化
						renderWhitespace: "boundary", // 空白文字を視覚的に表示（例: タブやスペース）
						cursorStyle: "line", // カーソルスタイル
						cursorSmoothCaretAnimation: "on", // カーソル移動を滑らかに
						bracketPairColorization: { enabled: true }, // 括弧のペアを色付け
						guides: {
							indentation: true, // インデントガイドを表示
							highlightActiveIndentation: true, // アクティブなインデントガイドを強調
						},
						renderLineHighlight: "all", // 現在の行を強調
						glyphMargin: true, // 行頭に余白を確保（デバッグ用など）
						smoothScrolling: true, // スムーズスクロールを有効化
					}}
					theme="vs-dark"
				/>
			</div>
		</div>
	);
}
