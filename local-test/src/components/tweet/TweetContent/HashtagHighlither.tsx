import React from "react";

interface HashtagHighlighterProps {
	text: string;
}

export default function HashtagHighlighter({ text }: HashtagHighlighterProps) {
	// ハッシュタグを検出して強調表示する関数
	const highlightHashtags = (text: string) => {
		const words = text.split(/(\s+)/);
		return words.map((word, index) => {
			if (word.startsWith("#")) {
				return (
					<React.Fragment key={index}>
						<span className="text-blue-500 font-semibold hover:underline cursor-pointer">
							{word}
						</span>
					</React.Fragment>
				);
			}
			return word;
		});
	};

	return (
		<p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
			{highlightHashtags(text)}
		</p>
	);
}
