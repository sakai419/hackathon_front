import React from "react";
import MonacoEditor from "@monaco-editor/react";

interface CodeEditorProps {
	value: string;
	language: string;
	onChange?: (value: string | undefined) => void;
	readOnly?: boolean;
}

export default function CodeEditor({
	value,
	language,
	onChange,
	readOnly = false,
}: CodeEditorProps) {
	return (
		<div
			onClick={(e) => {
				e.stopPropagation();
				e.preventDefault();
			}}
		>
			<MonacoEditor
				height="400px"
				defaultLanguage={language}
				defaultValue={value}
				onChange={onChange}
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
	);
}