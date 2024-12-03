import React from "react";

interface HighlighterProps {
	text: string;
	highlightWord?: string;
}

export default function Highlighter({ text, highlightWord }: HighlighterProps) {
	const highlightText = (text: string, highlightWord?: string) => {
		// highlightWord がある場合の正規表現を生成
		const regex = highlightWord
			? new RegExp(`(${highlightWord})`, "gi")
			: null;

		const words = text.split(/(\s+)/); // 空白で分割
		return words.map((word, index) => {
			if (word.startsWith("#")) {
				if (highlightWord && regex && regex.test(word)) {
					// ハッシュタグ内で highlightWord が一致する場合
					const parts = word.split(regex); // highlightWord を基準に分割
					return (
						<React.Fragment key={index}>
							<span className="text-blue-500 hover:underline cursor-pointer break-all">
								{parts.map((part, subIndex) =>
									part.toLowerCase() ===
									highlightWord.toLowerCase() ? (
										<span
											key={subIndex}
											className="font-bold"
										>
											{part}
										</span>
									) : (
										part
									)
								)}
							</span>
						</React.Fragment>
					);
				}

				// highlightWord が含まれない通常のハッシュタグ
				return (
					<React.Fragment key={index}>
						<span className="text-blue-500 hover:underline cursor-pointer break-all">
							{word}
						</span>
					</React.Fragment>
				);
			}

			if (highlightWord && regex && regex.test(word)) {
				// 通常の単語で highlightWord が一致する場合
				const parts = word.split(regex); // highlightWord を基準に分割
				return (
					<React.Fragment key={index}>
						{parts.map((part, subIndex) =>
							part.toLowerCase() ===
							highlightWord.toLowerCase() ? (
								<span key={subIndex} className="font-bold">
									{part}
								</span>
							) : (
								part
							)
						)}
					</React.Fragment>
				);
			}

			// それ以外はそのまま返す
			return word;
		});
	};

	return (
		<p className="text-gray-800 leading-relaxed whitespace-pre-wrap break-all">
			{highlightText(text, highlightWord)}
		</p>
	);
}
