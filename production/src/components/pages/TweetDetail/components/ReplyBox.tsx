import UserAvatar from "@/components/user/UserAvatar";
import { Button, Textarea } from "@/components/ui";
import { useClientProfileContext } from "@/context";
import { uploadFile } from "@/services/upload/upload";
import { Code, Media, MediaTypes } from "@/types/tweet";
import { useRef, useState } from "react";
import { Code2Icon, ImageIcon, X } from "lucide-react";
import Image from "next/image";
import CodeEditor from "@/components/common/CodeEditor";
import ButtonWithTooltip from "@/components/common/ButtonWithTooltip";

interface ReplyBoxProps {
	onTweet: (content: string, code?: Code, media?: Media) => Promise<void>;
}

export default function ReplyBox({ onTweet }: ReplyBoxProps) {
	const [content, setContent] = useState("");
	const [language, setLanguage] = useState("javascript");
	const [code, setCode] = useState("");
	const [mediaFile, setMediaFile] = useState<File | null>(null);
	const [mediaPreview, setMediaPreview] = useState<string | null>(null);
	const [mediaType, setMediaType] = useState<MediaTypes | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isEditorOpen, setIsEditorOpen] = useState(false);

	const fileInputRef = useRef<HTMLInputElement>(null);
	const clientProfile = useClientProfileContext().profile;

	const handleMediaClick = () => {
		fileInputRef.current?.click();
	};

	const handleEditorClick = () => {
		setIsEditorOpen(!isEditorOpen);
	};

	const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			if (file.type.startsWith("image/")) {
				setMediaType("image");
			} else if (file.type.startsWith("video/")) {
				setMediaType("video");
			} else {
				setIsError(true);
				setErrorMessage("サポートされていないファイルタイプです");
			}

			setMediaFile(file);
			const previewUrl = URL.createObjectURL(file);
			setMediaPreview(previewUrl);
		}
	};

	const removeMedia = () => {
		setMediaFile(null);
		setMediaPreview(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const handleTweet = async () => {
		if (!content.trim() && !code.trim() && !mediaFile) return;
		try {
			setIsLoading(true);
			let media = undefined;
			if (mediaFile && mediaType) {
				try {
					const url = await uploadFile(mediaFile);
					media = {
						url: url,
						type: mediaType,
					};
				} catch (error) {
					console.error(error);
					setIsError(true);
					setErrorMessage("アップロードに失敗しました");
					setIsLoading(false);
					return;
				}
			}

			await onTweet(
				content,
				code.trim() ? { language: language, content: code } : undefined,
				media
			);

			setContent("");
			setCode("");
			setMediaFile(null);
			setMediaPreview(null);
			setMediaType(null);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsError(true);
			setErrorMessage("ツイートに失敗しました。もう一度お試しください");
			setIsLoading(false);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<div className="flex-grow">
				<div className="flex items-start space-x-2 p-2">
					<UserAvatar
						userId={clientProfile?.userInfo.userId || ""}
						src={clientProfile?.userInfo.profileImageUrl || ""}
						alt={clientProfile?.userInfo.userName || ""}
						size="w-12 h-12"
					/>
					<div className="flex-1 space-y-4">
						<Textarea
							placeholder="返信をポスト"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							className="resize-none border-none focus-visible:ring-0 text-lg"
						/>
						{mediaPreview && (
							<div className="relative">
								<Image
									src={mediaPreview}
									alt="アップロード画像"
									width={500}
									height={300}
									className="rounded-xl object-cover max-h-[300px] w-full"
								/>
								<Button
									size="icon"
									variant="secondary"
									className="absolute top-2 right-2 rounded-full bg-black/50 hover:bg-black/70"
									onClick={removeMedia}
								>
									<X className="h-4 w-4 text-white" />
								</Button>
							</div>
						)}
					</div>
				</div>
				{isEditorOpen && (
					<CodeEditor
						value={code}
						language={language}
						onChange={(value, newLanguage) => {
							setCode(value || "");
							setLanguage(newLanguage);
						}}
					/>
				)}
			</div>
			<div className="sticky bottom-0 bg-background border-b">
				<div className="flex justify-between items-center p-4">
					<div className="flex items-center">
						<input
							type="file"
							ref={fileInputRef}
							onChange={handleMediaChange}
							accept="image/*"
							className="hidden"
						/>
						<ButtonWithTooltip
							description="メディアを追加"
							buttonProps={{
								onClick: handleMediaClick,
								size: "icon",
								variant: "ghost",
							}}
							content={<ImageIcon className="h-5 w-5" />}
						/>
						<ButtonWithTooltip
							description="ソースコードを追加"
							buttonProps={{
								onClick: handleEditorClick,
								size: "icon",
								variant: "ghost",
							}}
							content={<Code2Icon className="h-5 w-5" />}
						/>
					</div>
					<Button
						onClick={handleTweet}
						disabled={
							(!content.trim() && !code.trim() && !mediaFile) ||
							isLoading
						}
						className="rounded-full px-6 bg-sky-500 font-semibold"
					>
						{isLoading ? "投稿中..." : "返信"}
					</Button>
				</div>
				<div className="flex justify-between items-center mt-4">
					{isError && (
						<p className="text-red-500 text-sm mt-2">
							{errorMessage}
						</p>
					)}
				</div>
			</div>
		</>
	);
}
