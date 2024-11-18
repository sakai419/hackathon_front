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
		<MonacoEditor
			height="400px"
			defaultLanguage={language}
			defaultValue={value}
			onChange={onChange}
			options={{
				readOnly: readOnly,
				minimap: { enabled: false },
			}}
			theme="vs-dark"
		/>
	);
}
