import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Code2Icon, ImageIcon, X } from "lucide-react";
import Image from "next/image";
import UserAvatar from "../UserAvatar";
import { useState, useRef, useEffect } from "react";
import { UserInfoWithoutBio } from "@/types/userInfoWithoutBio";
import { uploadFile } from "@/services/upload/upload";
import { Code, Media, MediaTypes, TweetInfo } from "@/types/tweetInfo";
import ButtonWithTooltip from "../ButtonWithTooltip";
import CodeEditor from "../CodeEditor";
import RelatedTweetCard from "../RelatedTweetCard";
import TweetItem from "../TweetItem";

interface TweetDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onTweet: (content: string, code?: Code, media?: Media) => Promise<void>;
	userInfo?: UserInfoWithoutBio;
	relatedTweet?: TweetInfo;
	tweetType?: "tweet" | "reply" | "quote";
}

export default function TweetDialog({
	isOpen,
	onClose,
	onTweet,
	userInfo,
	relatedTweet,
	tweetType = "tweet",
}: TweetDialogProps) {
	const [content, setContent] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isEditorOpen, setIsEditorOpen] = useState(false);
	const [code, setCode] = useState("");
	const [launguage, setLanguage] = useState("javascript");
	const [errorMessage, setErrorMessage] = useState("");
	const [mediaFile, setMediaFile] = useState<File | null>(null);
	const [mediaUrl, setMediaUrl] = useState<string | null>(null);
	const [mediaType, setMediaType] = useState<MediaTypes | null>(null);
	const [mediaPreview, setMediaPreview] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

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

		if (mediaFile && !mediaUrl) {
			setIsLoading(true);
			try {
				const url = await uploadFile(mediaFile);
				setMediaUrl(url);
			} catch (error) {
				console.log(error);
				setIsError(true);
				setErrorMessage(
					"画像のアップロードに失敗しました。もう一度お試しください。"
				);
				return;
			}
		}

		setIsLoading(true);
		try {
			await onTweet(
				content,
				code.trim()
					? { language: launguage, content: code }
					: undefined,
				mediaFile
					? {
							url: mediaUrl!,
							type: mediaType!,
					  }
					: undefined
			);
			setContent("");
			setMediaFile(null);
			setMediaUrl(null);
			setMediaPreview(null);
			setIsError(false);
			setErrorMessage("");
			onClose();
		} catch (error) {
			console.log(error);
			setIsError(true);
			setErrorMessage(
				"ツイートの投稿に失敗しました。もう一度お試しください。"
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (!isOpen) {
			setContent("");
			setMediaFile(null);
			setMediaUrl(null);
			setMediaPreview(null);
			setMediaType(null);
			setCode("");
			setLanguage("javascript");
			setIsError(false);
			setErrorMessage("");
			setIsLoading(false);
			setIsEditorOpen(false);
		}
	}, [isOpen]);

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle className="sr-only">
						ツイートを作成
					</DialogTitle>
				</DialogHeader>
				{tweetType === "reply" && relatedTweet && (
					<TweetItem
						tweet={relatedTweet}
						showThreadLine={true}
						updateTweet={() => {}}
						readOnly={true}
					/>
				)}
				<div className="flex space-x-4">
					<UserAvatar
						withLink={false}
						userId={userInfo?.userId || ""}
						src={userInfo?.profileImageUrl || ""}
						alt={userInfo?.userName || ""}
						size="w-12 h-12"
					/>
					<div className="flex-1 space-y-4">
						<Textarea
							placeholder="いまどうしてる？"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							className="min-h-[100px] resize-none border-none focus-visible:ring-0 text-lg"
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
						{tweetType === "quote" && relatedTweet && (
							<RelatedTweetCard tweet={relatedTweet} />
						)}
					</div>
				</div>
				<div className="flex justify-between items-center mt-4">
					<div className="flex items-center">
						<input
							type="file"
							ref={fileInputRef}
							onChange={handleMediaChange}
							accept="image/*"
							className="hidden"
						/>
						<ButtonWithTooltip
							description="画像を追加"
							onClick={handleMediaClick}
							buttonSize={"icon"}
							content={<ImageIcon className="h-5 w-5" />}
						/>
						<ButtonWithTooltip
							description="ソースコードを追加"
							onClick={handleEditorClick}
							buttonSize={"icon"}
							content={<Code2Icon className="h-5 w-5" />}
						/>
					</div>
					<Button
						onClick={handleTweet}
						disabled={
							(!content.trim() && !code.trim() && !mediaFile) ||
							isLoading
						}
						className="rounded-full px-6"
					>
						{isLoading ? "投稿中..." : "ポストする"}
					</Button>
				</div>
				<div className="flex justify-between items-center mt-4">
					{isError && (
						<p className="text-red-500 text-sm mt-2">
							{errorMessage}
						</p>
					)}
				</div>
				{isEditorOpen && (
					<CodeEditor
						value={code}
						language={launguage}
						onChange={(value, language) => {
							setCode(value || "");
							setLanguage(language);
						}}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
}
